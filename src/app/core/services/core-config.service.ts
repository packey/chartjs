import { LocaleService } from '~shared/services/locale.service';

export function loadInitialConfigs(localeService: LocaleService): Function {
  return () => localeService.initializeLocaleImport();
}
