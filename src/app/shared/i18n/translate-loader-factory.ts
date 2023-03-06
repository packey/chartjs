import { TranslateHttpLoader } from '~shared/i18n/translate-http-loader';

export function createTranslateLoader() {
  return new TranslateHttpLoader('./assets/i18n/', '.json');
}
