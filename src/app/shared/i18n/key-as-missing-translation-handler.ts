import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class KeyAsMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return params.key;
  }
}
