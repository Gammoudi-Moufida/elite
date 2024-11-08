export class CarsFilters {
    constructor(
      public carType? : CarsTypes,
      public minTotalBudget? : number,
      public maxTotalBudget? : number,
      public minMonthBudget? : number,
      public maxMonthBudget? : number,
      public disponibility? : Disponibilities,
      public fuel? : Fuels,
      public text? : string,
    ) {}
  }

  export class CarsTypes {
    constructor(
      public berline_compacte : boolean = false,
      public breakType : boolean = false,
      public citadine : boolean = false,
      public coupe_cabriolet : boolean = false,
      public monospace : boolean = false,
      public suv_4x4_crossover : boolean = false,
    ) {}
  }

  export class Disponibilities {
    constructor(
        public arrivage : boolean = false,
        public stock : boolean = false,
        public commande : boolean = false,
    ) {}
  }

  export class Fuels {
    constructor(
        public essence : boolean = false,
        public diesel : boolean = false,
        public hybride : boolean = false,
        public electrique : boolean = false,
    ) {}
  }