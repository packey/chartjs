import { TranslateLoader } from '@ngx-translate/core';
import { Observable, defer, from } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(public prefix: string = '/assets/i18n/', public suffix: string = '.json') {}

  /**
   * Gets the translations from the server
   */
  getTranslation(lang: string): Observable<Object> {
    return defer(() =>
      from(
        fetch(`${this.prefix}${lang}${this.suffix}`).then(response => {
          if (!response.ok) {
            // Fallback to default language when loading resource fails
            return {};
          }

          return response.json();
        })
      )
    );
  }
}
