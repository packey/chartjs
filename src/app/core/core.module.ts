import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { TecProfileI18n } from '@tecan/ui';

import { CoreContainerComponent } from '~core/components/core-container/core-container.component';
import { ErrorLayoutComponent } from '~core/components/error-layout/error-layout.component';
import { FatalErrorComponent } from '~core/components/fatal-error/fatal-error.component';
import { MainMenuComponent } from '~core/components/main-menu/main-menu.component';
import { NotFoundComponent } from '~core/components/not-found/not-found.component';
import { ProfileI18nService } from '~core/services/profile-i18n.service';
import { CoreEffects } from '~core/store/core.effects';
import { EmptyPipe } from '~shared/pipes/empty.pipe';
import { LocationPipe } from '~shared/pipes/location.pipe';
import { SharedModule } from '~shared/shared.module';

@NgModule({
  declarations: [
    CoreContainerComponent,
    MainMenuComponent,
    NotFoundComponent,
    FatalErrorComponent,
    ErrorLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    EffectsModule.forFeature([CoreEffects]),
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [EmptyPipe, LocationPipe, { provide: TecProfileI18n, useClass: ProfileI18nService }],
  exports: [MainMenuComponent]
})
export class CoreModule {}
