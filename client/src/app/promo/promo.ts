export class PromoPage {
    constructor(
      public status?: boolean,
      public imageBandeau?: string,
      public image?: string,
      public lien?: string,
      public startDate?: string,
      public endDate?: string,
      public actif?: number,
      public availabilityFilter?: number,
    ) { }
  }

  export class EncartPromotion {

    constructor(
      public id?: number, 
      public image?: string,
      public imageHome?: string,
      public lien?: string,
      public target?:string,
      public actif?: number

    ){}
  }