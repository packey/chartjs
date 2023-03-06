import { AuthConfig } from '@auth0/auth0-angular';

import { ApiConfig } from '~shared/configuration/models/api-config.model';
import { CopyrightConfig } from '~shared/configuration/models/copyright-config.model';
import { I18nConfig } from '~shared/configuration/models/i18n-config.model';
import { LinksConfig } from '~shared/configuration/models/links-config.model';

export interface AppConfig {
  /* eslint-disable @typescript-eslint/naming-convention */
  production: boolean;
  api: ApiConfig;
  auth: AuthConfig;
  i18n: I18nConfig;
  links: LinksConfig;
  copyright: CopyrightConfig;
}
