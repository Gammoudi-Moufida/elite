/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, writeFileSync } from 'fs';
import * as fs from 'fs';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/client/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  
  // server.get('/devis*', (req, res) => { 
  //   res.sendFile(join(distFolder, '', 'index.html'));
  // });

    server.get('/recherche*', (req, res) => {
      const currentDomain = req.hostname;
      const allowedDomains = ['www.preprod.leclubsolution.fr', 'www.leclubsolution.fr'];
  
      if (allowedDomains.includes(currentDomain)) {
        let metaTag = '<meta name="robots" content="noindex, nofollow">';
    
        const indexPath = join(distFolder, 'index.html');
        fs.readFile(indexPath, 'utf8', (err, content) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }
    
          // Ajout de la balise meta dans le contenu du fichier
          const updatedContent = content.replace('</head>', `${metaTag}</head>`);
    
          // Envoi du fichier modifié
          res.send(updatedContent);
        });
      } else {
        // Si le domaine n'est pas autorisé, envoie simplement le fichier index.html
        res.sendFile(join(distFolder, '', 'index.html'));
      }
  });

  server.get('/next', (req, res) => {

    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err, html) => {
      if (err) {
        console.error('Error during SSR:', err);
        return res.status(500).send(err);
      }
      const commentRegex = /<!--[\s\S]*?-->|<!---->/g;
      html = html.replace(commentRegex, '');

      let metaTag = '<meta name="robots" content="noindex, nofollow">';
      html = html.replace('</head>', `${metaTag}</head>`);
      res.send(html);
    });
  });
  
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {

    // res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err, html) => {
      if (err) {
        console.error('Error during SSR:', err);
        return res.status(500).send(err);
      }
      const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
      let styles = '';
      let newHtml = html.replace(styleRegex, (match, p1) => {
        styles += p1;
        return '';
      });

      const cssFileName = 'custom-styles.css';
      const cssPath = join(distFolder, cssFileName);
      writeFileSync(cssPath, styles, 'utf8');
      const linkTag = `<link rel="stylesheet" href="${cssFileName}">`;
      newHtml = newHtml.replace('</head>', `${linkTag}</head>`);

      res.send(newHtml);
    });
  });

  // server.get('/voiture-neuve*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });

  // server.get('/vente-voiture*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
