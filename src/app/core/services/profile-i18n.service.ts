import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TecProfileI18n } from '@tecan/ui';

@Injectable()
export class ProfileI18nService extends TecProfileI18n {
  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe(() => {
      this.titleLabel = this.translateService.instant('profile.title');
      this.languageLabel = this.translateService.instant('profile.language');
      this.logoutLabel = this.translateService.instant('profile.logout');
      this.themeLabel = this.translateService.instant('profile.theme');

      this.changes.next(null);
    });
  }

  getVersion(version: string): string {
    return this.translateService.instant('profile.version', { version });
  }

  getCopyright(releaseYear: number, lastUpdateYear: number): string {
    return this.translateService.instant('profile.trademark', { releaseYear, lastUpdateYear });
  }
}
