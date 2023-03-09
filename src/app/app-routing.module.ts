import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreContainerComponent } from '~core/components/core-container/core-container.component';
import { ErrorLayoutComponent } from '~core/components/error-layout/error-layout.component';
import { FatalErrorComponent } from '~core/components/fatal-error/fatal-error.component';
import { NotFoundComponent } from '~core/components/not-found/not-found.component';
import { ROUTES } from '~shared/constants/routes';
import { DefaultRouteGuard } from '~shared/guards/default-route.guard';
import { PermissionGuard } from '~shared/guards/permission.guard';
import { SilentAuthGuard } from '~shared/guards/silent-auth.guard';
import { ChartComponent } from './features/chart/chart.component';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorLayoutComponent,
    children: [
      {
        path: ROUTES.FATAL_ERROR.path,
        component: FatalErrorComponent
      },
      {
        path: ROUTES.NOT_FOUND_NO_PROFILE.path,
        component: NotFoundComponent
      }
    ]
  },

  {
    path: '',
    component: CoreContainerComponent,
    canActivate: [SilentAuthGuard],
    canLoad: [SilentAuthGuard],
    canActivateChild: [SilentAuthGuard],
    children: [
      {
        path: ROUTES.INSTRUMENTS.path,
        canActivate: [PermissionGuard],
        loadChildren: () => import('~instruments/instruments.module').then(m => m.InstrumentsModule),
        data: {
          permission: ROUTES.INSTRUMENTS.permission
        }
      },
      {
        path: ROUTES.CHART.path,
        component: ChartComponent,
        data: {
          permission: ROUTES.CHART.permission
        }
      },
      { path: '', component: NotFoundComponent, canActivate: [DefaultRouteGuard] },
      { path: '**', component: NotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
