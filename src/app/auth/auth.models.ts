
export class User {
  userKey: string;
  providerKey: string;
  contractId: string;
  email: string;
  pass: string;
  loggedIn!: boolean;
  name!: string;
  exist!: string;
  error!:string;

  constructor(userKey: string, providerKey: string, contractId: string, email:string, pass: string) {
      this.userKey= userKey;
      this.contractId = contractId;
      this.providerKey = providerKey;
      this.email = email;
      this.pass = pass;
      this.exist = "";
  }
}

export class Menu {
  name: string;
  path: string;
  showInstrumentButton: boolean;
  enabled: boolean;
  order: number;
  principal: boolean;
  submenus: Menu[];

  constructor(name: string,
      path: string,
      showInstrumentButton: boolean,
      enabled: boolean,
      order: number,
      principal: boolean,
      submenus: Menu[]) {
      this.name = name;
      this.path = path;
      this.showInstrumentButton = showInstrumentButton;
      this.enabled = enabled;
      this.order = order;
      this.principal = principal;
      this.submenus = submenus;
  }
}

export interface FxUser {
  userKey?: string;
  providerKey?: string;
  // contractId?: string;
  // email?: string;
  // pass?: string;
  // loggedIn?: boolean; // Temporal en lo que se define la autenticaciónx
  name?: string;
  exist?: string;
  error?:string;
  refContrato?:string;
  withAccess?:boolean;
}

export interface UserDataResponse {
  result?: Result;
  data?: Data;
  errores?: String[]
}

export interface Data {
  data: UserData[];
}

export interface UserData {
  CVE_USUARIO: string;
  ID_EMPLEADO: number;
  ID_EMPRESA: number;
  TX_NOM_EMPLEADO: string;
  NOM_EMPRESA: string;
  ID_OFICINA: number;
  ID_CONTRATO: number;
  REF_NUM_CONTRATO: string;
  DESC_OFICINA: string;
  TX_INF_ADICIONAL_CTO: string;
  NIVEL_SEGURIDAD: string;
  ID_DIVISION_EMPLEADO: string;
  AREA: string;
  REGION: string;
  SUBGRUPO: string;
}

export interface Result {
  code: string;
  info: string;
}
