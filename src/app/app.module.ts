import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';

import { AnimatedDigitComponent } from './components/animated-digits/animated-digits.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MovimientosDivisasComponent } from './components/movimientos-divisas/movimientos-divisas.component';
import { ResumenDivisasComponent } from './components/resumen-divisas/resumen-divisas.component';
import { MovimientosDerivadosComponent } from './components/movimientos-derivados/movimientos-derivados.component';
import { ResumenDerivadosComponent } from './components/resumen-derivados/resumen-derivados.component';
import { MovimientosBursatilComponent } from './components/movimientos-bursatil/movimientos-bursatil.component';
import { ResumenBursatilComponent } from './components/resumen-bursatil/resumen-bursatil.component';
import { ResumenCreditosComponent } from './components/resumen-creditos/resumen-creditos.component';
import { ResumenSwapsComponent } from './components/resumen-swaps/resumen-swaps.component';
import { MovimientosSwapsComponent } from './components/movimientos-swaps/movimientos-swaps.component';
import { ResumenInversionesComponent } from './components/resumen-inversiones/resumen-inversiones.component';
import { ResumenCentralComponent } from './components/resumen-central/resumen-central.component';
import { MovimientosCentralComponent } from './components/movimientos-central/movimientos-central.component';
import { VerDetalleComponent } from './components/ver-detalle/ver-detalle.component';
import { LoginWso2Component } from './components/login-wso2/login-wso2.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AnimatedDigitComponent,
    MovimientosDivisasComponent,
    ResumenDivisasComponent,
    MovimientosDerivadosComponent,
    ResumenDerivadosComponent,
    MovimientosBursatilComponent,
    ResumenBursatilComponent,
    ResumenCreditosComponent,
    ResumenSwapsComponent,
    MovimientosSwapsComponent,
    ResumenInversionesComponent,
    ResumenCentralComponent,
    MovimientosCentralComponent,
    VerDetalleComponent,
    LoginWso2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
