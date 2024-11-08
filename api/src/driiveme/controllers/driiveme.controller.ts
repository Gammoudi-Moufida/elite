import { Controller, Get, Query } from '@nestjs/common';
import { SearchPipe } from 'src/pipes/search.pipe';
import { DriivemeDto } from '../dto/driiveme.dto';

const axios = require('axios')
@Controller('driiveme')
export class DriivemeController {

  constructor() { }

  @Get('delivery')
  async getDeliveryPartners(@Query('', new SearchPipe()) query?: DriivemeDto) {
    if (query) {
      let url = process.env.ELITE_DELIVERY_URL + "?key=" + process.env.ELITE_DELIVERY_KEY + "&format=" + query.format + "&departure=" + encodeURI(query.departure) + "&destination=" + encodeURI(query.destination) + "&vehiclecategory=" + encodeURI(query.vehiclecategory) + "&vehicle-size=" + query.vehicule_size
      return await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          return res.data;
        });
    }
  }
}