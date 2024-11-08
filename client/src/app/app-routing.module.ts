import { NgModule } from '@angular/core';
import { RouterModule, UrlSegment, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
​
const listTransmissionIncludes=['automatique','manuelle']
const listCarburantincludes=['diesel','electrique', 'hydrogene','essence','gpl_gnv','hybride','ethanol']
const listBudgetincludes=['10000','15000','20000','30000']
const listCategorieVehiculeIncludes=['citadine','berline_compacte','break','suv_4x4_crossover','cabriolet','coupe','ludospace','monospace','fourgon','fourgonnette','camion','pick_up']
const listSegmentVehiculeIncludes=['4x4','citadine','berline','break','cabriolet','compacte','coupe','ludospace','monospace','multispace','roadster','spider','suv','fourgon','fourgonnette','camion','pick_up']
const listTypeVehiculeIncludes=['utilitaire','particulier']
const listColorsIncludes=['blanc','bleu','gris','marron','noir','rouge','vert']
const routes: Routes = [
​
    
    // *******
    // Home Leasing route 
    // *******
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path == 'leasing') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment('lease', {}),
              typePage: new UrlSegment('home', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./home-leasing/home-leasing.component').then(m => m.HomeLeasingComponent)
    },
    
    // *******
    // Brands route
    // *******
    {
      matcher: (url) => {
        if ((url.length === 1 && url[0].path == 'nos-marques' )|| (url.length === 2 && url[0].path == 'leasing' && url[1].path == 'nos-marques')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              typePage: new UrlSegment('brands', {})
            },
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/brands/brands.component').then(m => m.BrandsComponent)
    },
    // *******
    // Home route 
    // *******
    {
      matcher: (url) => {
        if (url.length === 0 ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('home', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./home-next/home-next.component').then(m => m.HomeNextComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path == 'next') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('home', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./home-next/home-next.component').then(m => m.HomeNextComponent)
    },
    
    // *******
    // Brands route
    // *******
    {
      matcher: (url) => {
        if ((url.length === 1 && url[0].path == 'nos-marques' )|| (url.length === 2 && url[0].path == 'leasing' && url[1].path == 'nos-marques')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              typePage: new UrlSegment('brands', {})
            },
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/brands/brands.component').then(m => m.BrandsComponent)
    },
​
    // *******
    // Search route 
    // *******
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'new' && url[1].path == 'next' && url[2].path == 'recherche') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              typePage: new UrlSegment('search', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./search/algolia-search.component').then(m => m.AlgoliaSearchComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 &&   url[0].path == 'recherche') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              typePage: new UrlSegment('search', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./search/algolia-search.component').then(m => m.AlgoliaSearchComponent)
    },
    {
      path: 'recherche/comparateur',
      loadComponent: () => import('./search/comparator/comparator.component').then(m => m.ComparatorComponent)
    },

    // *******
    // Devis route 
    // *******
    {
      matcher: (url) => {
        if ((url.length === 3) && url[0].path.indexOf('voiture-') != -1 && url[0].path.indexOf('voiture-en-stock') == -1 && url[0].path.indexOf('-neuve') == -1) {
          return {
            consumed: url,
            posParams: {
              offerId: new UrlSegment(url[2].path.replace('.html',''), {}),
              mark: new UrlSegment(url[0].path.split('-')[1], {}),
              model: new UrlSegment(url[1].path.split('-')[0], {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('devis', {}),
              devisId: new UrlSegment(url.length === 3?url[2].path:null, {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },

    {
      matcher: (url) => {
        if ((url.length === 6) && url[0].path.indexOf('voiture-') != -1 ) {
          return {
            consumed: url,
            posParams: {
              offerId: new UrlSegment(url[2].path, {}),
              mark: new UrlSegment(url[0].path.split('-')[1], {}),
              model: new UrlSegment(url[1].path.split('-')[0], {}),
              rentContributionValue: new UrlSegment(url[3].path, {}),
              rentMileageValue: new UrlSegment(url[4].path, {}),
              rentDurationValue: new UrlSegment(url[5].path.replace('.html',''), {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('devis', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },

    {
      matcher: (url) => {
        if ((url.length === 5) && url[0].path == 'devis') {
          return {
            consumed: url,
            posParams: {
              offerId: new UrlSegment(url[1].path.replace('.html',''), {}),
              rentContributionValue: new UrlSegment(url[2].path, {}),
              rentMileageValue: new UrlSegment(url[3].path, {}),
              rentDurationValue: new UrlSegment(url[4].path.replace('.html',''), {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('devis', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },
​
    // *******
    // Old devis routes 
    // *******
    {
      matcher: (url) => {
        if ((url.length === 2 || url.length === 3) && url[0].path == 'devis') {
          return {
            consumed: url,
            posParams: {
              offerId: new UrlSegment(url[1].path.replace('.html',''), {}),
              type: new UrlSegment('new', {}),
              typePage: new UrlSegment('old_devis', {}),
              devisId: new UrlSegment(url.length === 3?url[2].path:null, {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },
    
    // *******
    // Modele route list
    // *******
    {
      matcher: (url) => {
        if (url.length === 2  && url[0].path.indexOf('voiture-') != -1 && url[0].path.indexOf('voiture-neuve') == -1 && url[1].path.split('.').pop() == 'html') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[0].path.replace('voiture-','').split('-').pop(), {}),
              slugMark: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace('voiture-',''), {}),
              model: new UrlSegment(url[1].path.split('-').pop().replace('.html', ''), {}),
              slugModel: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")).replace(' ','-'), {}),
              type: new UrlSegment('modelVn', {}),
              typePage: new UrlSegment('modele', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
    },

  {
    matcher: (url) => {
      if (url.length === 3  && url[0].path == 'vente-voiture') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model: new UrlSegment(url[2].path.split('-').pop().replace('.html', ''), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")), {}),
            type: new UrlSegment('modelVn', {}),
            typePage: new UrlSegment('modele', {}),
            oldToNewRouteRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
​
      if (url.length === 3 && url[0].path == 'voiture-neuve' && url[2].path.indexOf('prix') !=-1 && url[2].path != 'tarifs.html') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model: new UrlSegment(url[2].path.split('-').pop().replace('.html', ''), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf(",")).replace(' ','-'), {}),
            fuel: new UrlSegment(((url[2].path.split(',').pop().replace('.html', '')).replace('prix-','').replace("-"+url[2].path.split('-').pop().replace('.html', ''),'')), {}),
            type: new UrlSegment('tarif', {}),
            typePage: new UrlSegment('modele', {})
            
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./carburant/carburant.component').then(m => m.CarburantComponent)
  },

  {
    matcher: (url) => {
      if (url.length === 3  && url[0].path == 'voiture-neuve' && url[2].path.indexOf('prix') ==-1 &&  url[2].path != 'tarifs.html' && url[2].path.split('.').pop() == 'html') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model: new UrlSegment(url[2].path.split('-').pop().replace('.html', ''), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")), {}),
            type: new UrlSegment('marque_modeles_redirect', {}),
            oldToNewRouteRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  
  {
    matcher: (url) => {
      if (url.length === 2 && url[0].path != "leasing" && url[0].path.split('-')[0] == "leasing" && url[1].path != "") {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(",")[1], {}),
           slugMark: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf(",")).replace('leasing-',''), {}),
            model: new UrlSegment(url[1].path.split(",")[1], {}),
            slugModel: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf(",")).replace(' ','-'), {}),
            type: new UrlSegment('lease', {}),
            typePage: new UrlSegment('modele', {}),
            modelLeaseRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[0].path == "leasing" && url[2].path != "") {   
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split("-").splice(-1,1)[0], {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.indexOf(url[1].path.split("-").splice(-1,1)[0])-1), {}),
            model: new UrlSegment(url[2].path.split("-").splice(-1,1).pop().replace('.html', ''), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")).replace(' ','-'), {}),
            type: new UrlSegment('lease', {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.split("-")[0]=='vehicule' && url[0].path.split(",").length == 3) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(",")[1], {}),
            slugMark: new UrlSegment(url[0].path.split(",")[0].replace('vehicule-',''), {}),
            model: new UrlSegment(url[0].path.split(",")[2].replace('.html', '').replace(' ','-'), {}),
            slugModel: new UrlSegment(null, {}),
            type: new UrlSegment('utility', {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 1 && url[0].path.split("_").pop() == '.asp') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.replace('.asp', ''), {}),
            model: new UrlSegment('.asp', {}),
            type: new UrlSegment('modelMoinsCherRewrite', {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 4 && url[0].path == 'vente-voiture' && url[3].path.indexOf('finition')!=-1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model: new UrlSegment(url[2].path.split('-').pop(), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_finition_vn', {}),
            finition: new UrlSegment(url[3].path.replace('finition-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 4 && url[0].path == 'vente-voiture' && url[3].path.indexOf('moteur')!=-1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model: new UrlSegment(url[2].path.split('-').pop(), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_motorisation_vn', {}),
            motorisation: new UrlSegment(url[3].path.replace('moteur-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[2].path.indexOf('finition')!=-1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(',').pop(), {}),
            slugMark: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf(",")).replace('leasing-',''), {}),
            model: new UrlSegment(url[1].path.split(',').pop(), {}),
            slugModel: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf(",")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_finition_lease', {}),
            finition: new UrlSegment(url[2].path.replace('finition-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {}),
            modelLeaseRedirect: new UrlSegment('true', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 4 && url[3].path.indexOf('finition')!=-1 && url[0].path == 'leasing') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split("-").splice(-1,1)[0], {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.indexOf(url[1].path.split("-").splice(-1,1)[0])-1), {}),
            model: new UrlSegment(url[2].path.split("-").splice(-1,1)[0], {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_finition_lease', {}),
            finition: new UrlSegment(url[3].path.replace('finition-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[2].path.indexOf('moteur')!=-1 ) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(',').pop(), {}),
            slugMark: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf(",")).replace('leasing-',''), {}),
            model: new UrlSegment(url[1].path.split(',').pop(), {}),
            slugModel: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf(",")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_motorisation_lease', {}),
            motorisation: new UrlSegment(url[2].path.replace('moteur-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {}),
            modelLeaseRedirect: new UrlSegment('true', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 4 && url[3].path.indexOf('moteur')!=-1 && url[0].path == 'leasing') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split("-").splice(-1,1)[0], {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.indexOf(url[1].path.split("-").splice(-1,1)[0])-1), {}),
            model: new UrlSegment(url[2].path.split("-").splice(-1,1)[0], {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")).replace(' ','-'), {}),
            type: new UrlSegment('marque_modele_offres_motorisation_lease', {}),
            motorisation: new UrlSegment(url[3].path.replace('moteur-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 2 && url[0].path.split("-")[0]=='vehicule' && url[0].path.split(",").length == 3  && url[1].path.indexOf('finition')!=-1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(",")[1], {}),
            slugMark: new UrlSegment(url[0].path.split(",")[0].replace('vehicule-',''), {}),
            model: new UrlSegment(url[0].path.split(",")[2], {}),
            slugModel: new UrlSegment(null, {}),
            type: new UrlSegment('marque_modele_offres_finition_utility', {}),
            finition: new UrlSegment(url[1].path.replace('finition-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
    {
    matcher: (url) => {
      if ( url.length === 2 && url[0].path.split("-")[0]=='vehicule' && url[0].path.split(",").length == 3 && url[1].path.indexOf('moteur')!=-1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(",")[1], {}),
            slugMark: new UrlSegment(url[0].path.split(",")[0].replace('vehicule-',''), {}),
            model: new UrlSegment(url[0].path.split(",")[2], {}),
            slugModel: new UrlSegment(null, {}),
            type: new UrlSegment('marque_modele_offres_motorisation_utility', {}),
            motorisation: new UrlSegment(url[1].path.replace('moteur-','').replace('.html',''), {}),
            typePage: new UrlSegment('modele', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
    
  {
    matcher: (url) => {
      if (url.length === 4  && url[0].path == 'vente-voiture' && url[3].path.indexOf('.html')!=-1 ) {
         return { 
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slugMark: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            model:new UrlSegment(url[2].path.split('-').pop(), {}),
            slugModel: new UrlSegment(url[2].path.substring(0,url[2].path.lastIndexOf("-")), {}),
            type: new UrlSegment('marque_modeles_finition_redirect', {}),
            oldToNewRouteRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },

  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path =='devis_option.asp') {
        return{
          consumed: url,
          posParams: {
            type: new UrlSegment('model_option_devis', {}),
            oldToNewRouteRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/model/model.component').then(m => m.ModelComponent)
  },
    
    // *******
    // Marque route list
    // *******
    
  {
    matcher: (url) => {
      if (url.length === 1 && url[0].path.indexOf('vehicule') != -1 &&  url[0].path.split(",").length == 2) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(",").pop().replace('.html',''), {}),
            slug: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace('vehicule-',''), {}),
            type: new UrlSegment('utility', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[0].path == 'voiture-neuve' &&  url[2].path == 'tarifs.html') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop(), {}),
            slug: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            type: new UrlSegment('newTarif', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 2 && url[0].path.indexOf('voiture-neuve') != -1 && url[1].path.split('.').pop() == 'html') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop().replace('.html',''), {}),
            slug: new UrlSegment(url[1].path.split('-')[0], {}),
            type: new UrlSegment('marque_redirect', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length == 2 && url[0].path.split('-')[0] == "leasing" && url[1].path == "") {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.substring(url[0].path.indexOf(',') + 1), {}),
            slug: new UrlSegment(url[0].path.split(",")[0].replace('leasing-',''), {}),
            type: new UrlSegment('lease', {}),
            typePage: new UrlSegment('marque', {}),
            marqueRedirect: new UrlSegment('true', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length == 2 && url[0].path == "leasing" && url[1].path.split('-')[0] != 'categorie' && url[1].path.includes('-')) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split("-").splice(-1,1).pop().replace('.html', ''), {}),
            slug: new UrlSegment(url[1].path.substring(0,url[1].path.indexOf(url[1].path.split("-").splice(-1,1)[0])-1), {}),
            type: new UrlSegment('lease', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.indexOf('pas-chere') != -1) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(".")[0].split("-").pop(), {}),
            slug: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace('-pas-chere',''), {}),
            type: new UrlSegment('marqueMoinsCherRewrite', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.split("-")[0] == 'remise') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.split(".")[0].split("-").pop(), {}),
            slug: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace('remise-',''), {}),
            type: new UrlSegment('marqueRemiseRewrite', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path =='ref_marques_seule.asp') {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment('CODEMARQUE', {}),
            slug: new UrlSegment(null, {}),
            type: new UrlSegment('refMarqueSeule', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 2 && url[0].path == 'vente-voiture' && url[1].path.indexOf('.html')!=-1 ) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[1].path.split('-').pop().replace('.html',''), {}),
            slug: new UrlSegment(url[1].path.substring(0,url[1].path.lastIndexOf("-")), {}),
            type: new UrlSegment('marqueVn', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.indexOf('collaborateur') != -1 ) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.substring(url[0].path.indexOf(',') + 1).replace('.html',''), {}),
            slug: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace(/collaborateur-|-ou/g,''), {}),
            type: new UrlSegment('new_ref_marques', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark/mark.component').then(m => m.MarkComponent)
  },
  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='ventes-flash') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('Ventes-flash', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },
  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='destockage') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('Déstockage', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },

  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='nouveautes') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('Nouveautés', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },
  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='prix-malin') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('Prix malin', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },
  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='printemps') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('Promo garantie 24 mois', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },
  {
    matcher: (url) => {
      if ( (url.length === 1) && url[0].path =='french-days') {
        return {
          consumed: url,
          posParams: {
            promoName:new UrlSegment('French days', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./promo/promo-pages/promo-pages.component').then(m => m.PromoPagesComponent) 
  },
  {
    path: 'vente-privee',
    loadComponent: () => import('./promo/private-sales/private-sales.component').then(m => m.PrivateSalesComponent)
  },
  {
    path: 'road-match',
    loadComponent: () => import('./promo/road-match/road-match.component').then(m => m.RoadMatchComponent)
  },
  {
    matcher: (url) => {
      if ( (url.length === 1 || url.length === 2) && url[0].path =='voiture-en-stock') {
        return {
          consumed: url,
          posParams: {
            mark:new UrlSegment(url[1]?.path, {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/stock/stock.component').then(m => m.StockComponent)
  },

    // *******
    // New carburant route list
    // *******

    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'automobile' && listCarburantincludes.includes(url[1].path)  && !url[1].path.includes('categorie-') ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(null, {}),
              typePage: new UrlSegment('carburant', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'leasing' && !url[1].path.includes('categorie-') ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(null, {}),
              typePage: new UrlSegment('leasingCarburant', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },

    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'leasing' && url[1].path.includes('categorie-')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              energie: new UrlSegment(null, {}),
              typeCar: new UrlSegment(url[1].path.replace('categorie-',''), {}),
              typePage: new UrlSegment('leasingTypeVehicule', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'automobile' && url[2].path.indexOf('categorie') != -1 && listCategorieVehiculeIncludes.indexOf(url[2].path.replace('categorie-', ''))!= -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment(null, {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(url[2].path.replace('categorie-',''), {}),
              typePage: new UrlSegment('carburantTypeVehicule', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'automobile' && url[2].path.indexOf('marque') != -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[2].path.replace("marque-",""), {}),
              type: new UrlSegment(null, {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(null, {}),
              typePage: new UrlSegment('carburantMarque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path.includes('automobile-') && listSegmentVehiculeIncludes.includes(url[0].path.split('-')[1].replace('.asp','')) && url[0].path.split('-')[1].replace('.asp','') && url[0].path.split('.')[1]=='asp') {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment(null, {}),
              segment: new UrlSegment(url[0].path.split('-')[1].replace('.asp',''), {}),
              typePage: new UrlSegment('segmentVehicule', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if ( url.length === 2 && url[0].path.split("-")[0]=='vehicule' && listCarburantincludes.indexOf(url[1].path.replace('.html',''))!= -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[0].path.split(",")[0].replace('vehicule-','').replace('-neuf',''), {}),
              energie: new UrlSegment(url[1].path.replace('.html',''), {}),
              type: new UrlSegment('marque_carburant_utility', {}),
              typePage: new UrlSegment('marqueCarburantUtility', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },


    // *******
    // Old Occasion Symfony pages route list
    // *******

    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path == 'voiture-occasion') {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('old_occasion_home', {}),
              typePage: new UrlSegment('old_occasion_home', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'voiture-occasion' && url[1].path.includes('marque-')) {
          let mark = url[1].path.split('-').pop().replace(/\+/g, '-')
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(mark, {}),
              type: new UrlSegment('old_marque_page_occasion', {}),
              typePage: new UrlSegment('old_marque_page_occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'voiture-occasion' && url[1].path.includes('modele-')) {
          let mark = url[1].path.split('-')[1].replace(/\+/g, '-')
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(mark, {}),
              type: new UrlSegment('old_model_page_occasion', {}),
              typePage: new UrlSegment('old_model_page_occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'voiture-occasion' && url[1].path.includes('annonce-')) {
          let mark = url[1].path.substring(0,url[1].path.lastIndexOf("-")).replace("annonce-","")
              mark = mark.substring(0, mark.lastIndexOf("-")).replace(/\+/g, '-')
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(mark, {}),
              type: new UrlSegment('old_annonce_page_occasion', {}),
              typePage: new UrlSegment('old_annonce_page_occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path.includes('annonce-marque-')) {
          let mark = url[0].path.replace('.html','').replace('annonce-marque-','');
          let id = mark.split('-').pop()
          mark = mark.replace('-'+id,'').replace(/\+/g, '-')
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(mark, {}),
              type: new UrlSegment('old_occasion_marque', {}),
              typePage: new UrlSegment('old_occasion_marque', {})
            }
          };
        }
        return null;
      },
        loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path.includes('annonce-modele-')) {
          let data = url[0].path.replace('.html','').replace('annonce-modele-','');
          let mark = data.split('-')[0].replace(/\+/g, '-')
          let model = data.replace(data.split('-')[0]+'-','').replace(/\+/g, '-')
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(mark, {}),
              model: new UrlSegment(model, {}),
              type: new UrlSegment('old_occasion_model', {}),
              typePage: new UrlSegment('old_occasion_model', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path.includes('annonce-occasion-')) {
          let data = url[0].path.replace('.html','').replace('annonce-occasion-','');
          let offreId = data.split(',').pop()
          let mark = data.split('-')[0].replace(/\+/g, '-')
          let generation = data.replace(data.split('-')[0]+'-','').replace(/\+/g, '-').replace(','+offreId,'')
          return {
            consumed: url,
            posParams: {              
              mark: new UrlSegment(mark, {}),
              generation: new UrlSegment(generation, {}),
              offreId: new UrlSegment(offreId, {}),
              type: new UrlSegment('old_occasion_tunnel', {}),
              typePage: new UrlSegment('old_occasion_tunnel', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
// *******
    //  Voiture occasion + type + budget
    // *******
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion'&& url[1].path.includes('categorie-')&& listCategorieVehiculeIncludes.includes(url[1].path.split('-')[1])&& url[2].path.includes('budget-')&& listBudgetincludes.includes(url[2].path.split('-')[1])) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              typeCar:new UrlSegment(url[1].path.split('-')[1],{}),
              price:new UrlSegment(url[2].path.split('-')[1],{}),
              typePage: new UrlSegment('occasion_type_budget', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    // *******
    //  Voiture occasion + budget
    // *******
    {
      matcher: (url) => {
        
        if (url.length === 2 && url[0].path == 'occasion'&& url[1].path.includes('budget-')&& listBudgetincludes.includes(url[1].path.split('-')[1])) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              price:new UrlSegment(url[1].path.split('-')[1],{}),
              typePage: new UrlSegment('occasion_budget', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    // *******
    //  Voiture occasion pas chère
    // *******
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'occasion' && url[1].path.indexOf('voiture-pas-chere')!= -1) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_pas_chere', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    // *******
    // Occasion pages route list
    // *******
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path == 'occasion') {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_home', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'occasion' && !listCarburantincludes.includes(url[1].path) && !url[1].path.includes('categorie-') && !url[1].path.includes('type-') && !url[1].path.includes('boite-') && !url[1].path.includes('couleur-')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_marque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion' && listCarburantincludes.indexOf(url[1].path) == -1 && !url[1].path.includes('type-') && !url[1].path.includes('categorie-') && !url[2].path.includes('boite-')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_model', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion'&& listCarburantincludes.indexOf(url[1].path) == -1 && !url[3].path.includes('boite-') && !url[3].path.includes('finition-')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              generation: new UrlSegment(url[3].path, {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_generation', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },

    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && url[3].path.includes('boite-') && listTransmissionIncludes.indexOf(url[3].path.replace('boite-','')) != -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              transmission: new UrlSegment(url[3].path.replace('boite-',''), {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_transmission', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },

    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && url[3].path.includes('finition-') ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              finition: new UrlSegment(url[3].path.replace('finition-',''), {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_finition', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    
    {
      matcher: (url) => {
        if (url.length === 5 && url[0].path == 'occasion'&& listCarburantincludes.indexOf(url[1].path) == -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              generation: new UrlSegment(url[3].path, {}),
              offerId: new UrlSegment(url[4].path.replace('.html',''), {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_tunnel', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 8 && url[0].path == 'occasion') {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              generation: new UrlSegment(url[3].path, {}),
              offerId: new UrlSegment(url[4].path.replace('.html',''), {}),
              rentContributionValue: new UrlSegment(url[5].path, {}),
              rentMileageValue: new UrlSegment(url[6].path, {}),
              rentDurationValue: new UrlSegment(url[7].path, {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_tunnel', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./tunnel/tunnel.component').then(m => m.TunnelComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'occasion' && url[1].path.indexOf('categorie-')!= -1 && listCategorieVehiculeIncludes.indexOf(url[1].path.replace('categorie-', ''))!= -1) {
          return {
            consumed: url,
            posParams: {
              typeCar: new UrlSegment(url[1].path.split('-')[1], {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_categorie', {})
            }
          };
        }

        return null;
      },
      
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'occasion' && url[1].path.indexOf('type-')!= -1 && listTypeVehiculeIncludes.indexOf(url[1].path.replace('type-', ''))!= -1 ) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              typeVehicule: new UrlSegment(url[1].path.replace('type-', ''), {}),
              typePage: new UrlSegment('occasion_type_vehicule', {})
            }
          };
        }

        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion'  && url[1].path.indexOf('type-')!= -1 && listTypeVehiculeIncludes.indexOf(url[1].path.replace('type-', ''))!= -1 
         && url[2].path.includes('marque-')) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              mark: new UrlSegment(url[2].path.replace('marque-',''), {}),
              typeVehicule: new UrlSegment(url[1].path.replace('type-', ''), {}),
              typePage: new UrlSegment('occasion_type_vehicule_marque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion' && url[1].path.includes('categorie-')&& listCategorieVehiculeIncludes.indexOf(url[1].path.replace('categorie-', ''))!= -1 && url[2].path.includes('marque-')) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              mark: new UrlSegment(url[2].path.replace('marque-',''), {}),
              typeCar: new UrlSegment(url[1].path.replace('categorie-', ''), {}),
              typePage: new UrlSegment('occasion_categorie_vehicule_marque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion' && listTransmissionIncludes.indexOf(url[2].path.replace('boite-', ''))!= -1 && listCarburantincludes.indexOf(url[1].path) == -1 && !url[1].path.includes('categorie-')) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              mark: new UrlSegment(url[1].path, {}),
              transmission: new UrlSegment(url[2].path.replace('boite-',''), {}),
              typePage: new UrlSegment('occasion_transmission_marque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && listCarburantincludes.indexOf(url[1].path)!= -1 && listCategorieVehiculeIncludes.indexOf(url[2].path.replace('categorie-', ''))!= -1 && url[3].path.includes('marque-')) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              energie: new UrlSegment(url[1].path, {}),
              mark: new UrlSegment(url[3].path.replace('marque-',''), {}),
              typeCar: new UrlSegment(url[2].path.replace('categorie-',''), {}),
              typePage: new UrlSegment('occasion_carburant_categorie_marque', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && listCarburantincludes.indexOf(url[1].path)!= -1 && url[2].path.includes('marque-') && url[3].path.includes('modele-')) {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('occasion', {}),
              energie: new UrlSegment(url[1].path, {}),
              mark: new UrlSegment(url[2].path.replace('marque-',''), {}),
              model: new UrlSegment(url[3].path.replace('modele-',''), {}),
              typePage: new UrlSegment('occasion_carburant_marque_modele', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },

    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && url[3].path.includes('boite-') && listTransmissionIncludes.indexOf(url[3].path.replace('boite-','')) != -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              transmission: new UrlSegment(url[3].path.replace('boite-',''), {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_transmission', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
   
    {
      matcher: (url) => {
        if (url.length === 4 && url[0].path == 'occasion' && url[3].path.includes('finition-') ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path, {}),
              model: new UrlSegment(url[2].path, {}),
              finition: new UrlSegment(url[3].path.replace('finition-',''), {}),
              type: new UrlSegment('occasion', {}),
              typePage: new UrlSegment('occasion_finition', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
    },
   
    // *******
    // Occasion new carburant route list 
    // *******

    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'occasion' && listCarburantincludes.indexOf(url[1].path)!= -1 && !url[1].path.includes('type-') && !url[1].path.includes('boite-') && !url[1].path.includes('couleur-') ) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment('occasion', {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(null, {}),
              typePage: new UrlSegment('occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion' && url[2].path.indexOf('categorie') != -1) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(null, {}),
              type: new UrlSegment('occasion', {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(url[2].path.split('-').pop(), {}),
              typePage: new UrlSegment('occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },
    {
      matcher: (url) => {
        if (url.length === 3 && url[0].path == 'occasion' && url[2].path.indexOf('marque') != -1 && !url[1].path.includes('type-') && !url[1].path.includes('categorie-')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[2].path.replace('marque-',''), {}),
              type: new UrlSegment('occasion', {}),
              energie: new UrlSegment(url[1].path, {}),
              typeCar: new UrlSegment(null, {}),
              typePage: new UrlSegment('occasion', {})
            }
          };
        }
        return null;
      },
      loadComponent: () => import('./cars/new-carburant/new-carburant.component').then(m => m.NewCarburantComponent)
    },

    // ********
    // reprise
    // ********
    {
      matcher: (url) => {
        if (url.length === 1 && url[0].path == 'reprise-voiture') {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('reprise', {}),
              typePage: new UrlSegment('home_reprise',{})
            }
          }
        }
        return null;
      },
      loadComponent: () => import('./reprise/home/home-reprise/home-reprise.component').then(m => m.HomeRepriseComponent) 
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'reprise-voiture' && url[1].path == 'mon-estimation') {
          return {
            consumed: url,
            posParams: {
              type: new UrlSegment('reprise', {}),
              typePage: new UrlSegment('estimation_reprise',{})
            }
          }
        }
        return null;
      },      
      loadComponent: () => import('./reprise/estimation/estimation-steps/estimation-steps.component').then(m => m.EstimationStepsComponent) 
    },
    {
      matcher: (url) => {
        if (url.length === 2 && url[0].path == 'reprise-voiture' && url[1].path.includes('.html') || url.length === 3 && url[0].path == 'reprise-voiture' && url[2].path.includes('.html')) {
          return {
            consumed: url,
            posParams: {
              mark: new UrlSegment(url[1].path.replace('.html',''), {}),
              model: new UrlSegment(url[2]?.path?.replace('.html',''), {}),
              type: new UrlSegment('reprise', {}),
              typePage: new UrlSegment('estimation_mark_reprise',{})
            }
          }
        }
        return null;
      },      
      loadComponent: () => import('./reprise/estimation/mark-reprise-estimation/mark-reprise-estimation.component').then(m => m.MarkRepriseEstimationComponent) 
    },
    // *******
    // Occasion new facettes pages route list 
    // *******

  {
    matcher: (url) => {
      if (url.length === 2 && url[0].path == 'occasion' && url[1].path.includes('boite-') && listTransmissionIncludes.indexOf(url[1].path.replace('boite-', '')) != -1) {
        return {
          consumed: url,
          posParams: {
            transmission: new UrlSegment(url[1].path.replace('boite-', ''), {}),
            type: new UrlSegment('occasion', {}),
            typePage: new UrlSegment('occasion_boite', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[0].path == 'occasion' && listCarburantincludes.indexOf(url[1].path) != -1 && url[2].path.includes('boite-') && listTransmissionIncludes.indexOf(url[2].path.replace('boite-', '')) != -1) {
        return {
          consumed: url,
          posParams: {
            energie: new UrlSegment(url[1].path, {}),
            transmission: new UrlSegment(url[2].path.replace('boite-', ''), {}),
            type: new UrlSegment('occasion', {}),
            typePage: new UrlSegment('occasion_carburant_boite', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 2 && url[0].path == 'occasion' && url[1].path.includes('couleur-') && listColorsIncludes.indexOf(url[1].path.replace('couleur-', '')) != -1) {
        return {
          consumed: url,
          posParams: {
            color: new UrlSegment(url[1].path.replace('couleur-', ''), {}),
            type: new UrlSegment('occasion', {}),
            typePage: new UrlSegment('occasion_color', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
  },
  {
    matcher: (url) => {
      if (url.length === 3 && url[0].path == 'occasion' && url[1].path.includes('categorie-') && listCategorieVehiculeIncludes.indexOf(url[1].path.replace('categorie-', '')) != -1 && url[2].path.includes('boite-') && listTransmissionIncludes.indexOf(url[2].path.replace('boite-', '')) != -1) {
        return {
          consumed: url,
          posParams: {
            typeCar: new UrlSegment(url[1].path.replace('categorie-', ''), {}),
            transmission: new UrlSegment(url[2].path.replace('boite-', ''), {}),
            type: new UrlSegment('occasion', {}),
            typePage: new UrlSegment('occasion_categorie_boite', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/occasion/occasion.component').then(m => m.OccasionComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.includes('voiture-neuve')) {
        return {
          consumed: url,
          posParams: {
            type: new UrlSegment('voitureNeuve', {}),
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark-moteur/mark-moteur.component').then(m => m.MarkMoteurComponent)
  },
  {
    matcher: (url) => {
      if ( url.length === 1 && url[0].path.includes('voiture-')) {
        return {
          consumed: url,
          posParams: {
            mark: new UrlSegment(url[0].path.replace('.html', '').split('-').pop(), {}),
            slugMark: new UrlSegment(url[0].path.substring(0,url[0].path.lastIndexOf("-")).replace('voiture-',''), {}),
            type: new UrlSegment('marqueVnMoteur', {}),
            typePage: new UrlSegment('marque', {})
          }
        };
      }
      return null;
    },
    loadComponent: () => import('./cars/mark-moteur/mark-moteur.component').then(m => m.MarkMoteurComponent)
  },

    // *******
    // Auto-discount route 
    // *******
    { 
      path: 'auto-discount.asp', 
      loadComponent: () => import('./cars/discount/discount/discount.component').then(m => m.DiscountComponent) 
    },
    {
      path: 'nos-agences',
      loadComponent: () => import('./agences/agences.component').then(m => m.AgencesComponent)
    },
    {
      path: 'marchands',
      loadComponent: () => import('./home-next/marchands/marchands.component').then(m => m.MarchandsComponent)
    },
    {path: '**', component: NotFoundComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation:'enabledBlocking', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
