import { Pipe, PipeTransform } from '@angular/core';

import { InstrumentLocation } from '~shared/models/instrument-location.interface';

@Pipe({
  name: 'location',
  pure: true
})
export class LocationPipe implements PipeTransform {
  transform(value: InstrumentLocation | undefined, showPartial: boolean = false, emptyLabel: string = ''): string {
    const country = value?.countryName || '';
    const city = value?.city || '';
    const divider = this.getDivider(value);

    return (country && city) || (showPartial && (country || city)) ? `${country}${divider}${city}` : emptyLabel;
  }

  private getDivider(location: InstrumentLocation | undefined): string {
    return location?.countryName && location.city ? ', ' : '';
  }
}
