import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from '~shared/services/locale.service';

@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string, private localeService: LocaleService) {}

  transform(value: Date | string | number | null | undefined, format = 'medium', timezone?: string): string | null {
    if (value == null || value === '') return null;

    return formatDate(value, format, this.localeService.localeId || this.locale, timezone);
  }
}
