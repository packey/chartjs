import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthClientConfig, AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TecTranslateService } from '@tecan/ui';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { CoreModule } from '~core/core.module';
import { loadInitialConfigs } from '~core/services/core-config.service';
import { environment } from '~env/environment';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { LOCAL_STORAGE } from '~shared/constants/injection-tokens';
import { AppTranslateService } from '~shared/i18n/app-translate.service';
import { DEFAULT_LANGUAGE_CODE } from '~shared/i18n/constants';
import { KeyAsMissingTranslationHandler } from '~shared/i18n/key-as-missing-translation-handler';
import { PaginatorI18nService } from '~shared/i18n/paginator-i18n.service';
import { createTranslateLoader } from '~shared/i18n/translate-loader-factory';
import { LocaleService } from '~shared/services/locale.service';
import { SharedModule } from '~shared/shared.module';
import { ChartComponent } from './features/chart/chart.component';
import { TestcomponentComponent } from './features/testcomponent/testcomponent.component';

@NgModule({
  declarations: [AppComponent, ChartComponent, TestcomponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: DEFAULT_LANGUAGE_CODE,
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: KeyAsMissingTranslationHandler
      },
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    }),
    AuthModule.forRoot(/* authConfig */),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorI18nService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigService.initialize,
      deps: [AuthClientConfig, AppConfigService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitialConfigs,
      multi: true,
      deps: [LocaleService]
    },
    { provide: TecTranslateService, useExisting: AppTranslateService },
    { provide: LOCAL_STORAGE, useValue: window.localStorage },
    // @tecan/ui provides its own theme for some material components.
    // Disable the theme presence check to avoid false warnings.
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
