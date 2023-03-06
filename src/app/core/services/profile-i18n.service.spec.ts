import { EventEmitter } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { MockProvider } from 'ng-mocks';
import { identity } from 'rxjs';

import { ProfileI18nService } from '~core/services/profile-i18n.service';

describe('ProfileI18nService', () => {
  let spectator: SpectatorService<ProfileI18nService>;
  let languageChange$ = new EventEmitter();
  let translateService: SpyObject<TranslateService>;

  let createService = createServiceFactory({
    service: ProfileI18nService,
    providers: [
      MockProvider(TranslateService, {
        onLangChange: languageChange$
      })
    ]
  });

  beforeEach(() => {
    spectator = createService();
    translateService = spectator.inject(TranslateService);

    translateService.instant.and.callFake(identity);
  });

  it('should create', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should translate copyright', () => {
    spectator.service.getCopyright(2020, 2022);

    expect(translateService.instant).toHaveBeenCalledOnceWith('profile.trademark', {
      releaseYear: 2020,
      lastUpdateYear: 2023
    });
  });

  it('should translate version', () => {
    spectator.service.getVersion('1.0.0');

    expect(translateService.instant).toHaveBeenCalledOnceWith('profile.version', {
      version: '1.0.0'
    });
  });

  it('should translate labels when language changes', fakeAsync(() => {
    languageChange$.emit();

    expect(spectator.service.languageLabel).toBe('profile.language');
    expect(spectator.service.logoutLabel).toBe('profile.logout');
    expect(spectator.service.titleLabel).toBe('profile.title');
  }));

  it('should emit a change when language changes', fakeAsync(() => {
    spyOn(spectator.service.changes, 'next');

    languageChange$.emit();

    expect(spectator.service.changes.next).toHaveBeenCalledTimes(1);
  }));
});
