import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { LocaleService } from '~shared/services/locale.service';

describe('LocaleService', () => {
  let spectator: SpectatorService<LocaleService>;
  const createService = createServiceFactory(LocaleService);

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get and set localeId.', () => {
    const locale = 'bg';
    spectator.service.localeId = locale;

    expect(spectator.service.localeId).toBe(locale);
  });

  it('should resolve promise, when initializeLocaleImport is called.', async () => {
    await expectAsync(spectator.service.initializeLocaleImport()).toBeResolved();
  });
});
