import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class livraisonService {
    constructor(
        private readonly httpService: HttpService
    ){}

    async sfAction(data) {
        let dataInfos = {
            data:data
        }
        const data0  = await  this.httpService.post(
            "http://bo.elite-auto.fr/api/v1/user/login",
            {
                "username" : "EAAPI",
                "password" :"API078"
                 }
            ).toPromise();
    
    
    
            const headersRequest = {
                'Content-Type': 'application/json', // afaik this one is not needed
                'Authorization': `${data0.data.token}`,
            };
    
            const data1  = await  this.httpService.post(
                "http://bo.elite-auto.fr/api/v1/clients/add/lead/private-sale",
                dataInfos,
                { headers: headersRequest }
                ).toPromise();
    
      }
    }
