import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { Theme } from '~core/models/theme.enum';
import { UserSettings } from '~core/models/user-settings.model';
import { SettingsStorageService } from '~core/services/settings-storage.service';
import { LOCAL_STORAGE } from '~shared/constants/injection-tokens';

describe('SettingsStorageService', () => {
  const createService = createServiceFactory({
    service: SettingsStorageService
  });
  let spectator: SpectatorService<SettingsStorageService>;
  let storage: SpyObject<Storage>;
  const settings: UserSettings = Object.freeze({
    version: 1,
    language: 'en',
    theme: Theme.Light
  });

  beforeEach(() => {
    spectator = createService({
      providers: [
        MockProvider(LOCAL_STORAGE, {
          getItem: jasmine.createSpy(),
          setItem: jasmine.createSpy()
        })
      ]
    });
    storage = spectator.inject(LOCAL_STORAGE);
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('get', () => {
    it('should return null when value is missing', () => {
      expect(spectator.service.get()).toBeNull();
    });

    it('should return parsed value from local storage', () => {
      storage.getItem.and.returnValue(JSON.stringify(settings));

      expect(spectator.service.get()).toEqual(settings);
    });
  });

  describe('set', () => {
    it('should set serialized value in local storage', () => {
      spectator.service.set(settings);

      expect(storage.setItem).toHaveBeenCalledOnceWith(spectator.service.key, JSON.stringify(settings));
    });
  });
});
