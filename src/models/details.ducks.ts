import { DetalleCuenta } from './details.types';

export const DetailsDucks: DetalleCuenta  = {
  inversion: {
    saldo: 1000,
    totalAbonos: 1000,
    totalCargos: 1000,
    charts: {
      totalInversion: [50, 50],
      totalAbonos: [50, 50],
      totalCargos: [50, 50],

    },
    descripcion: {
      abonos: {
        depositosSucursal: 40,
        depositosIntereses: 50,
        depositosVentaDivisas: 10,
      },
      cargos: {
        retiroCompraDivisasMd: 40,
        retiroCompraDivisas24hrs: 50,
        retiroFondosTransferencia: 10,
      },
    },
    ultimosMovimientos: [
      {
        id: 1,
        fecha: '31-Ago-2021',
        descripcion: 'Retiro compra de divisas 24 hrs',
        abonos: 0,
        cargos: 218000,
        saldo: 20768
      }
    ],
  },
  creditos: {},
  inversiones: {},
  derivados: {},
  operacionesDeMercado: {},
};
