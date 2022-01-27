import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';
import { ConfigService } from './config.service';
import { AuthModuleConfigFactory } from './auth.config.module';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

export function getStorageFactory() : OAuthStorage {
  return localStorage
}

export function getConfigFactory(configService: ConfigService): AuthConfig {
  return configService.authConfig;
}

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [

  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useFactory: getConfigFactory, deps: [ConfigService]},
        { provide: OAuthModuleConfig, useFactory: AuthModuleConfigFactory, deps: [ConfigService]},
        { provide: ValidationHandler, useClass: JwksValidationHandler},
        { provide: OAuthStorage, useFactory: getStorageFactory}
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule){
    if(parentModule) {
      throw new Error('AuthModule ya esta cargado. Solo es necesario importarlo en AppModule.');
    }
  }

}
