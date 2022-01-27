import { Assign } from 'utility-types';
// Main Type

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

export type DetalleCuenta = {
  inversion: DetalleInversion;
  divisas?: {
    usd: DetalleInversion;
    euro: DetalleInversion;
    cad: DetalleInversion;
  };
  swaps?: {
    usd: DetalleInversion;
    euro: DetalleInversion;
  };
  creditos?: Credito[];
  inversiones?: Inversion[];
  derivados?: Derivado;
  operacionesDeMercado?: OperacionesMercado;
};

// Section Types

export type DetalleInversion = {
  saldo: number;
  totalAbonos: number;
  totalCargos: number;
  charts: {
    totalInversion: number[];
    totalAbonos: number[];
    totalCargos: number[];
  };
  descripcion: {
    abonos: TotalAbonos;
    cargos: TotalCargos;
  };
  ultimosMovimientos: MovimientoCargo[];
};

export type Credito = {
  estadoCredito: string;
  numeroCredito: number;
  saldoInsoluto?: number;
  saldoLiquidado?: number;
  fechaVencimiento: string;
  numeroDePago: string;
  pagosPendientes: number;
  saldoInsolutoAnterior: number;
  pagosRealizadosMes: number;
  capital: number;
  anticiposCapital: number;
  interesesOrdinarios: number;
  interesesMoratorios: number;
  ivaIntereses: number;
  saldoInsolutoActual: number;
  saldoVencido: number;
  pagosRealizados: number[];
};

export type Inversion = {
  currency: string;
  status: string;
  monto: number;
  tasa: number;
  gatReal: number;
  interesesDepositados: number;
  interesesPorDepositar: number;
  periodo: string;
};

export type Derivado = {
  type: string;
  valuacionPosicionDerivado: number;
  nocionalVigente: {
    usd: number[],
    mxn: number[],
  },
  movimientosSwap: MovimientoSwap[];
};

export type OperacionesMercado = {
  posicionEnReporto: {
    inversionMesActual: number[];
    inversionMesAnterior: number[];
    movimientos: MovimientoReporto[];
  };
  mercadoDinero: {
    inversionMesActual: number[];
    inversionMesAnterior: number[];
    movimientos: MovimientoMercado[];
  };
};

// Table Items

export type MovimientoSwap = {
  fechaOperacion: string;
  fechaVencimiento: string;
  nocionalInicialPactado: number;
  tasaEntregar: {
    type: string;
    value: number;
  };
  tasaRecibir: {
    type: string;
    value: number;
  };
  nocionalVigente: number;
  valuacionActualMXP: number;
  valuacionActualMXN: number;
};

export type MovimientoCargo = {
  id: number;
  fecha: string;
  descripcion: string;
  abonos: number;
  cargos: number;
  saldo: number;
};

export type MovimientoReporto = {
  noTitulos: number;
  montoInvertido: number;
  fechaInicio: string;
  tasa: number;
  plazo: number;
  fechaVencimiento: number;
  valuacion: number;
  periodo: string;
};

export type MovimientoMercado = {
  emisoraSerie: string;
  fechaLiquidacion: string;
  titulos: number;
  precioMercado: number;
  valuacionMercado: number;
  periodo: string;
};

// Interactive Types

export type TotalAbonos = {
  depositosSucursal: number;
  depositosIntereses: number;
  depositosVentaDivisas: number;
};

export type TotalCargos = {
  retiroCompraDivisasMD: number;
  retiroComprarDivisas24hrs: number;
  retiroFondoTransferencia: number;
};


export type ProductValue = 'divisas' | 'swaps' | 'creditos' | 'inversiones' | 'derivados' | 'operaciones';

export type CurrencyValue = 'usd' | 'cad' | 'mxn' | 'euro';

export type Filter = {
  text: string;
  value: string;
  altText?: string;
};

export type Product = {
  text: string;
  icon: string;
  value: ProductValue;
};

export type Currency = {
  text: string;
  value: string;
};

export type ResumenDivisaType = {
  descDivisa: string;
  importeAbono: number;
  importeCargo: number;
  periodo: number;
  refNumContrato: string;
  saldo: number;
  saldoInicial: number;
}

export type ResumenDerivadosType = {
  periodo: number;
  refNumContrato: string;
  tipoCambio: number;
  tasaInteres: number;
  valuacionMxn: number;
  saldoGarantiasMxn: number;
}

export type ResumenSwapsType = {
  claveDivisa: string;
  descDivisa: string;
  descPeriodoAl: string;
  divSwapPactado: number;
  fechaSwapPactado: string;
  montoPactado: number;
  periodo: number;
  refNumContrato: string;
  saldoInicial: number;
  tipoCambioSwap: number;
};


export type ResumenInversionesType = {
  claveDivisa: string;
  descDivisa: string;
  descInversion: string;
  impInversion: number;
  periodo: number;
  refNumContrato:  string;
  totIntDepositar: number;
  totInterDeposPer: number;
};

export type InvestmentFilter = Assign<{
  text: string;
  value: string;
  altText?: string;
}, ResumenInversionesType>;

export type DerivadoType = {
  monedaRefer?: string;
  fechaOperacion?: string;
  fechaVencimiento?: string;
  impNocionPactado?: number;
  tasaEntregar?: string;
  tasaRecibir?: string;
  impNocionVigente?: number;
  impValuacionAct?: number;
  impValuacionMxn?: number;
  cantSubyacente?: number;
  claveTipoOperacion?: string;
  fechaLiquidacion?: string;
  idReferencia?: number;
  monedaContrav?: string;
  periodo?: number;
  precPactado?: number;
  refNumContrato?: string;
  tipoLiquidacion?: string;
  tipoModalidad?:string;
  claveCallPut?:string;
  precEjercicio?: number;
  primaUniPactada?: number;
};

export type Pager = {
  paginaActual: number;
  paginas: number[];
  filterBy: number;
}

export type DerivadoPayload = {
  tipoDerivado?: string;
};

export type SwapsPayload = {
  orderBy: string;
  ascDesc: string;
  currency: string;
};

export type CentralPayload = {
  orderBy?: string;
  ascDesc?: string;
};

export type DivisasPayload = {
  orderBy?: string;
  ascDesc?: string;
};

export type CreditosPayload = {
  estado: string;
};

export type InversionPayload = {
  cveDivisa?: string;
  tipo?: string;
};

export type BursatilPayload = {
  tipo: 'REPO' | 'CUST';
};


export type CreditoType = {
  catInformativo: string;
  clabeLinea: any;
  claveDivisa: string;
  descProducto: string;
  estadoCredito: string;
  fechaApertura: string;
  fechaCorteInteres: string;
  fechaInformacion: string;
  fechaProximoPago: string;
  fechaVencimiento: string;
  impAprobado: number;
  impCapitalReal: number;
  impDetCapital: number;
  impDetIVA: number;
  impDetIntMor: number;
  impDetIntOrd: number;
  impDispuesto: number;
  impPagoAnticipado: number;
  impPagoCapital: number;
  impPagoIntIVA: number;
  impPagoIntMoratorio: number;
  impPagoIntereses: number;
  impPagoTotal: number;
  impSaldoVencido: number;
  impTotalProximoPago: number;
  numPago: string;
  numPagosPendientes: number;
  ordenPresentacion: number;
  periodo: number;
  refNumContrato: string;
  saldoInsolutoMesAnt: number;
  subCredito: number;
  tasaIntMoratoria: string;
  tasaInteres: string;
  txEstado: string;
}

export type ResumenCentral = {
  banderaFactura: string;
  claveDivisa: string;
  comision: number;
  comisionNoFacturada: number;
  descDivisa: string;
  descPeriodoAl: string;
  gatNominal: number;
  gatReal: number;
  importeAbono: number;
  importeCargo: number;
  interesPagVista: number;
  intereses: number;
  interesesMoratorio: number;
  interesesOrdinarios: number;
  isrDerivados: number;
  isrDerivadosAcum: number;
  isrDineroAcum: number;
  isrDineroMes: number;
  isrDivFondosNal: number;
  isrDivFondosNalAcum: number;
  isrDivFondosNalSic: number;
  isrDivFondosNalSicAcum: number;
  isrFondosNal: number;
  isrFondosNalAcum: number;
  isrInteresAcum: number;
  isrInteresSaldo: number;
  isrInversion: number;
  isrInversionAcum: number;
  isrTotal: number;
  ivaComision: number;
  ivaNoFacturado: number;
  periodo: string;
  refNumContrato: string;
  saldoCredito: number;
  saldoGarantiaDeri: number;
  saldoInicial: number;
  saldoInversion: number;
  saldoPromedio: number;
  saldoPromedioCob: number;
  saldoTotal: number;
  saldoVista: number;
  subtotal: number;
  swapAutomatico: number;
  tasaInteres: number;
  total: number;
}

export type DerivadosTotales = {
  cantSubyacente?: number;
  contrato?: string;
  impValuacionAct?: number;
  impValuacionMxn?: number;
  instrumento?: string;
  periodo?: number;
  tipoDerivado?: string;

  impNocionPactado?: number;
  impNocionVigente?: number;
}
