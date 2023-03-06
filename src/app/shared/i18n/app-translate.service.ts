import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TecTranslateService } from '@tecan/ui';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService extends TecTranslateService {
  constructor(private translateService: TranslateService) {
    super();
  }

  translate(key: string, interpolateParams?: { [key: string]: string }): string {
    return this.translateService.instant(key, interpolateParams);
  }
}
