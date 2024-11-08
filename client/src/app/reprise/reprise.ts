export class RepriseSelectedVehicule {
  constructor(
    public dDateMec?: string,
    public fHP?: string,
    public iNbPortes?: number,
    public sVersion?: string,
    public sEnergie?: Energie,
    public sTypNatcode?: string,
    public sTransType?: string,
    public partnerName?: string,
    public typeReprise?: string,
    public idPartner?: number,
    public sImage?: string,
    public sMarque?: string,
    public fKW?: string,
    public dDateCatalogue?: string,
    public iPrix?: string,
    public i_veh_typseat?: string,
    public s_veh_typname?: string,
    public s_veh_typname2?: string,
    public f_veh_typhp?: string,
    public s_veh_typimpbegin?: string,
    public s_veh_typimpend?: string,
    public s_veh_typtxtbodyco1cd2lbl?: string,

  ) { }
}

export class BasicObj {
  constructor(
    public id?: string,
    public name?: string,
  ) { }
}


export class RepriseVehiculeInfos {
  constructor(
    public backTyre?: number,
    public carnetEntretien?: number,
    public couleur?: string,
    public courroie?: string,
    public dDateMec?: string,
    public fHP?: string,
    public frontTyre?: number,
    public iNbPortes?: number,
    public immat?: string,
    public importation?: number,
    public km?: number,
    public premiereMain?: number,
    public sTransType?: string,
    public sTypNatcode?: string,
    public sVersion?: string,
    public sellerie?: string,
    public texture?: string,
    public defauts?: string[],
    public sEnergie?: Energie,
    public sImage?: string,
    public estimationRepriseData?: EstimationRepriseData,
  ) { }
}


export class EstimationRepriseData {
  estimationJson: EstimationJson;
  idReprise: number
}

export class EstimationJson {
  dDateMec?: string;
  fHP?: string;
  idPartner?: string;
  partnerName?: string;
  sEnergie?: Energie;
  sImage?: string;
  sNbPorte?: number;
  sTransmission?: string;
  sVehTypnatcode?: string;
  sVersion?: string;
  s_rep_canal?: string;
  typeReprise?: string
}

export class Energie {
  id?: string;
  name?: string
}

export class EstimationRepriseDetails {
  energie?: Energie;
  error?: string;
  km?: string;
  libVehicule?: string;
  mec?: string;
  lienEstimationReprise? :string;
  porte?: string;
  statut?: number;
  typeBoite?: string;
  cpClient?: string;
}