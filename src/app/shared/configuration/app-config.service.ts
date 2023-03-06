import { Injectable } from '@angular/core';
import { AuthClientConfig, AuthConfig } from '@auth0/auth0-angular';
import { noop } from 'rxjs';

import { ApiConfig } from '~shared/configuration/models/api-config.model';
import { AppConfig } from '~shared/configuration/models/app-config.model';
import { CopyrightConfig } from '~shared/configuration/models/copyright-config.model';
import { I18nConfig } from '~shared/configuration/models/i18n-config.model';
import { LinksConfig } from '~shared/configuration/models/links-config.model';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private _configuration: AppConfig | null = null;
  private _version: string | null = null;

  get configuration(): AppConfig {
    if (this._configuration == null) {
      throw new Error('App Configuration is not loaded.');
    }

    return this._configuration;
  }

  get version(): string | null {
    return this._version;
  }

  static initialize = (authClientConfig: AuthClientConfig, config: AppConfigService) => () =>
    config.load().then(() => {
      authClientConfig.set(config.auth);
    });

  fetchConfiguration(): Promise<AppConfig> {
    return fetch('/configuration.json').then(response => response.json());
  }

  fetchVersion(): Promise<{ version: string }> {
    return fetch('/version.json')
      .then(response => response.json())
      .catch(() => noop);
  }

  async load(): Promise<void> {
    this._configuration = await this.fetchConfiguration();

    const { version } = await this.fetchVersion();
    this._version = version || '-';
  }

  get api(): ApiConfig {
    return this.configuration.api;
  }

  get baseApiPath(): string {
    return this.api?.base;
  }

  get auth(): AuthConfig {
    return this.configuration.auth;
  }

  get i18n(): I18nConfig {
    return this.configuration.i18n;
  }

  get links(): LinksConfig {
    return this.configuration.links;
  }

  get copyright(): CopyrightConfig {
    return this.configuration.copyright;
  }
}
