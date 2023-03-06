export const DEFAULT_LANGUAGE_CODE = 'en';
export const DEFAULT_LANGUAGE = { code: DEFAULT_LANGUAGE_CODE, name: 'English' };

/**
 * Contains Unicode script names for the supported languages.
 * Scripts names have to be prefixed with "Script=".
 *
 * https://www.regular-expressions.info/unicode.html#script
 *
 * Japanese is covered by Hiragana, Katakana, Han, and Latin scripts, while Chinese is covered by Han as well.
 */
export const LANGUAGE_UNICODE_SCRIPTS = ['Script=Latin', 'Script=Hiragana', 'Script=Katakana', 'Script=Han'];
