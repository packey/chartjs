import { Inject, Injectable } from '@angular/core';

import { UserSettings } from '~core/models/user-settings.model';
import { LOCAL_STORAGE } from '~shared/constants/injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  readonly key = 'core';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  get(): UserSettings | null {
    const storedValue = this.localStorage.getItem(this.key);

    return storedValue ? JSON.parse(storedValue) : null;
  }

  set(settings: UserSettings): void {
    this.localStorage.setItem(this.key, JSON.stringify(settings));
  }
}
