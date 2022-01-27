import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BursatilPayload, CentralPayload, CreditosPayload, DerivadoPayload, DivisasPayload, InversionPayload, SwapsPayload } from 'src/models/details.types';
import { ParamsService } from './params.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url = 'http://localhost:8080/edc-dinamico-0.0.1/api/monex/edc/{contrato}/{periodo}';
  url = 'https://edc-dinamico-estado-cuenta-dinamico-dev.apps.monex-desarroll.q4v7.p1.openshiftapps.com/api/monex/edc/{contrato}/{periodo}'

  periodoChanged$ = new Subject();

  constructor(private http: HttpClient, private paramsService: ParamsService) { }

  // Derivados

  getMovimientosDerivados(payload: DerivadoPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&tipoDerivado=${payload.tipoDerivado}`;
    return this.http.get(`${this.url}/{tipoDerivado}/derivadosResumen?${params}`)
  }

  getTiposDerivados() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/tiposDerivados?${params}`)
  }

  getResumenDerivados() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/derivadosResumen?${params}`)
  }



  // Swaps Auto

  getMovimientosSwaps(payload: SwapsPayload){
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&orderBy=${payload.orderBy}&ascDesc=${payload.ascDesc}&currency=${payload.currency}`;
    return this.http.get(`${this.url}/{orderBy}/{ascDesc}/{currency}/swaps?${params}`);
  }

  getSwapsAutoDivisas(){
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/swapsAutoDivisas?${params}`);
  }



  // Central

  getMovimientosCentral(payload: CentralPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&orderBy=${payload.orderBy}&ascDesc=${payload.ascDesc}`;
    return this.http.get(`${this.url}/{orderBy}/{ascDesc}/movimientos?${params}`)
  }

  getResumenCentral(currency: string) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&currency=${currency}`;
    return this.http.get(`${this.url}/{currency}/secciones?${params}`);
  }

  getSeccionesCentral() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/secciones?${params}`);
  }



  // Divisas

  getMovimientosDivisas(payload: DivisasPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&orderBy=${payload.orderBy}&ascDesc=${payload.ascDesc}`;
    return this.http.get(`${this.url}/{orderBy}/{ascDesc}/divisas?${params}`);
  }

  getResumenDivisas() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/divisas?${params}`);
  }



  // Creditos

  getCreditosEstado(payload: CreditosPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&estado=${payload.estado}`;
    return this.http.get(`${this.url}/{estado}/creditos?${params}`)
  }

  getCreditos() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/creditos?${params}`)
  }



  // Inversion

  getMovimientosInversion(payload: InversionPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&cveDivisa=${payload.cveDivisa}&tipo=${payload.tipo}`;
    return this.http.get(`${this.url}/{cveDivisa}/{tipo}/inversionMovimientos?${params}`);
  }

  getInversionGral() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/inversionGral?${params}`);
  }



  // Opc Mercado

  getMovimientosBursatil(payload: BursatilPayload) {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}&tipo=${payload.tipo}`;
    return this.http.get(`${this.url}/{tipo}/movimientosBursatil?${params}`);
  }

  getResumenBursatil() {
    const params = `contrato=${this.paramsService.contrato}&periodo=${this.paramsService.periodo}`;
    return this.http.get(`${this.url}/tiposBursatil?${params}`);
  }



  // Excel

  download(data: any, filename: string) {
    const csvData = this.ConvertToCSV(data);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    if (isIE && navigator.msSaveBlob) {
      const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      a.download = filename + '.csv';
    }
    a.click();
  }

  ConvertToCSV(objArray: any) {
    // tslint:disable-next-line:triple-equals
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    // tslint:disable-next-line:forin
    for (const index in objArray[0]) {
      // Now convert each value to string and comma-seprated
      row += index + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line:forin
      for (const index in array[i]) {
        // tslint:disable-next-line:triple-equals
        if (line != '') {
          line += ',';
        }
        line += '"' + array[i][index] + '"';
      }
      str += line + '\r\n';
    }
    return str;
  }
}
