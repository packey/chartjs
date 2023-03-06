import { AuthClientConfig } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import appConfig from 'src/configurations/configuration.json';

import { AppConfigService } from '~shared/configuration/app-config.service';
import appConfigNoApi from '~shared/mocks/config-no-api.stub.json';

describe('AppConfigService', () => {
  let spectator: SpectatorService<AppConfigService>;
  let fetchConfigurationSpy: SpyObject<any>;
  let fetchVersionSpy: SpyObject<any>;
  const versionResponse = { version: '0.0.1' };

  const createService = createServiceFactory({
    service: AppConfigService
  });

  beforeEach(() => {
    spectator = createService();

    fetchConfigurationSpy = spyOn(spectator.service, 'fetchConfiguration').and.returnValue(Promise.resolve(appConfig));
    fetchVersionSpy = spyOn(spectator.service, 'fetchVersion').and.returnValue(Promise.resolve(versionResponse));
  });

  it('should load configuration', async () => {
    await spectator.service.load();

    expect(spectator.service.configuration).toEqual(appConfig);
  });

  it('should load configuration', async () => {
    fetchVersionSpy.and.returnValue(Promise.resolve({ version: null }) as any);
    await spectator.service.load();

    expect(spectator.service.version).toEqual('-');
  });

  it('should load version', async () => {
    await spectator.service.load();

    expect(spectator.service.version).toEqual(versionResponse.version);
  });

  it('should return baseApiPath as configured', async () => {
    await spectator.service.load();

    expect(spectator.service.baseApiPath).toBe(appConfig.api.base);
  });

  it('should return baseApiPath with missing api in json', async () => {
    const configResponseNoApi = new Response(JSON.stringify(appConfigNoApi));
    fetchConfigurationSpy.and.returnValue(Promise.resolve(configResponseNoApi));

    await spectator.service.load();

    expect(spectator.service.baseApiPath).toBeFalsy();
  });

  it('should return auth', async () => {
    await spectator.service.load();

    expect(spectator.service.auth).toBeDefined();
  });

  it('should return api as configured', async () => {
    await spectator.service.load();

    expect(spectator.service.api).toEqual(appConfig.api);
  });

  it('should throw error when configuration has not been loaded yet', () => {
    expect(() => spectator.service.configuration).toThrowError('App Configuration is not loaded.');
  });

  it('should throw error when version has not been loaded yet', () => {
    expect(spectator.service.version).toBeNull();
  });

  it('should configure the AuthClientConfig correctly', async () => {
    const authClientConfig = new AuthClientConfig();

    await AppConfigService.initialize(authClientConfig, spectator.service)();

    const auth = spectator.service.auth;
    expect(authClientConfig.get()).toEqual(auth);
  });

  it('should return i18n as configured', async () => {
    await spectator.service.load();

    expect(spectator.service.i18n).toEqual(appConfig.i18n);
  });
});

describe('App config fetch functionality', () => {
  let spectator: SpectatorService<AppConfigService>;
  let fetchSpy: jasmine.Spy;
  const version = {
    version: '0.0.1'
  };

  const createService = createServiceFactory({
    service: AppConfigService
  });

  beforeEach(() => {
    spectator = createService();

    fetchSpy = spyOn(window, 'fetch')
      .withArgs('/version.json')
      .and.resolveTo({ json: () => Promise.resolve(version) } as any)
      .withArgs('/configuration.json')
      .and.resolveTo({ json: () => Promise.resolve(appConfig) } as any);
  });

  it('should fetch version', async () => {
    await spectator.service.load();

    expect(fetchSpy).toHaveBeenCalledWith('/version.json');
    expect(spectator.service.version).toBe(version.version);
  });

  it('should return - when version cannot be loaded', async () => {
    fetchSpy.withArgs('/version.json').and.rejectWith();

    await spectator.service.load();

    expect(fetchSpy).toHaveBeenCalledWith('/version.json');
    expect(spectator.service.version).toBe('-');
  });
});
