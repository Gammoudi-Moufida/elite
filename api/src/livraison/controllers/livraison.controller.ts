import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DriivemeDto } from 'src/driiveme/dto/driiveme.dto';
import { SearchPipe } from 'src/pipes/search.pipe';
import { livraisonService } from '../livraison.service';
const axios = require('axios')
@Controller('livraisons')
export class LivraisonController {
    constructor(
      private readonly livraisonService: livraisonService
    ) { }

    @Get('delivery-partners/:offreId/:postalCode')
    async getDeliveryPartners(@Param('offreId') offreId,@Param('postalCode') postalCode) {
        let urlApi = process.env.WWW_EA_API+"/api/v2/devis/getDeliveryPartners/"+ offreId+"/"+postalCode
        let dataFromApi:any ={'departement':null,'delivery':null}

        dataFromApi =  await axios.get(urlApi,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then((res) => {
            return res.data;
        });
        let query={
          'format':'json',
          'departure':'Coignieres',
          'destination':dataFromApi?.ville,
          'vehiclecategory':dataFromApi?.vehCateg,
          'vehicule_size':dataFromApi?.vehSize
        }
        let domicilePrice= await this.getDriivemeResult(query)
          dataFromApi.domicilePrice =  this.getHomeDelivery(domicilePrice?.prices?.professionnel)
        return dataFromApi
    }
    async getDriivemeResult(@Query('', new SearchPipe()) query?: DriivemeDto){
      let urlDriiveMe = process.env.ELITE_DELIVERY_URL + "?key=" + process.env.ELITE_DELIVERY_KEY + "&format=" + query.format + "&departure=" + encodeURI(query.departure) + "&destination=" + encodeURI(query.destination) + "&vehiclecategory=" + encodeURI(query.vehiclecategory) + "&vehicle-size=" + query.vehicule_size
      return await axios.get(urlDriiveMe,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          return res.data;
        });
    }
    getHomeDelivery(result:number):number {
    if(result != null){
      let price =result
      price=price*1.2
      let  maxDeliveryPrice:number=500
      if(maxDeliveryPrice> price){
        price = price*1.1;
          return  Math.floor(price);
        }  
      else{
          return -1;
          }
    }else{
      return -1
    }
  }

  @Post('/add/lead/private-sale')
  sfAction(@Body() data) {
    return this.livraisonService.sfAction(data);
  }


}