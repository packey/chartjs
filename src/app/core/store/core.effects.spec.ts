import { AuthService } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import config from 'src/configurations/configuration.json';

import * as CoreActions from '~core/store/core.actions';
import { CoreEffects } from '~core/store/core.effects';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { Language } from '~shared/configuration/models/language.model';

describe('CoreEffects', () => {
  let actions$: Observable<any>;
  let spectator: SpectatorService<CoreEffects>;
  let authService: SpyObject<AuthService>;

  const languages: Language[] = [{ code: 'en', name: 'English' }];

  const createEffect = createServiceFactory({
    service: CoreEffects,
    providers: [
      provideMockActions(() => actions$),
      MockProvider(AppConfigService, {
        ...config,
        i18n: { supportedLanguages: languages }
      }),
      MockProvider(AuthService)
    ]
  });

  beforeEach(() => {
    spectator = createEffect();
    authService = spectator.inject(AuthService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('logout$', () => {
    it('should logout', () => {
      actions$ = of(CoreActions.logout());

      spectator.service.logout$.subscribe();

      expect(authService.logout).toHaveBeenCalledWith({ returnTo: config.auth.redirectUri });
    });
  });
});
