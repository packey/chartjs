import { Theme } from '~core/models/theme.enum';

/**
 * Describes the user settings stored in local storage
 * IMPORTANT: if you change this interface make sure to increment the version in UserSettingsService.
 */
export interface UserSettings {
  version: number;
  language: string;
  theme: Theme;
}
