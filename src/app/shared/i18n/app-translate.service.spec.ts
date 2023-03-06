import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { MockProvider } from 'ng-mocks';

import { AppTranslateService } from '~shared/i18n/app-translate.service';

describe('AppTranslateService', () => {
  let spectator: SpectatorService<AppTranslateService>;
  const createService = createServiceFactory({
    service: AppTranslateService,
    providers: [MockProvider(TranslateService)]
  });
  let translateService: SpyObject<TranslateService>;

  beforeEach(() => {
    spectator = createService();
    translateService = spectator.inject(TranslateService);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call translation service', () => {
    spectator.service.translate('translation-key', { name: 'test' });

    expect(translateService.instant).toHaveBeenCalledWith('translation-key', { name: 'test' });
  });
});
