import { Injectable, Injector } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as CoreActions from '~core/store/core.actions';
import { AppConfigService } from '~shared/configuration/app-config.service';

@Injectable()
export class CoreEffects {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.logout),
        tap(() => {
          // Workaround issue with AuthService that has not been configured yet when injected in constructor.
          const authService = this.injector.get(AuthService);
          authService.logout({ returnTo: this.appConfiguration.auth.redirectUri });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private appConfiguration: AppConfigService, private injector: Injector) {}
}
