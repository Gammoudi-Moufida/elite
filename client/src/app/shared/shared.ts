export class SliderParams {
    constructor(
      public minRight: number,
      public minLeft : number,
      public maxRight : number,
      public maxLeft : number,
      public minValue : number,
      public maxValue : number,
      public step : number,
    ) {}
  }

  export class SliderOutValues {
    constructor(
      public valueRight ?: number,
      public valueLeft ?: number,
      public stepValue ?: number,
    ) {}
  }
  export class ConfianceHome {
    constructor(
        public status?: boolean,
        public confiance?: Confiance[],
    ) {}
}
class Confiance {
  constructor(
      public titre?: string,
      public texte?: string,
      public urlImg?: string,
  ) {}
}