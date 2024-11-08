import { Controller, Get, Param } from '@nestjs/common';
const axios = require('axios');

@Controller('algolia')
export class AlgoliaController {
  constructor() {}
  
  @Get('/rules/:index?')
    async getDatas(@Param('index') index: string = 'prod_ELITE_OFFERS') {
      const data = '';
    
      const config = {
      method: 'get',
        maxBodyLength: Infinity,
        url: `https://2iadkfqcgn-dsn.algolia.net/1/indexes/${index}`,
      headers: {
        'x-algolia-application-id': '2IADKFQCGN',
        'x-algolia-api-key': '9af86df5de1a1e74d80182a070a78ca8',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      data: data,
      };
    
      try {
        const response = await axios.request(config);
        console.log('user Data', JSON.stringify(response.data.userData));
        return response.data.userData; // renvoyer les données ici si nécessaire
      } catch (error) {
        console.log(error);
        throw error; // ou gérer l'erreur selon vos besoins
      }
    }
}
