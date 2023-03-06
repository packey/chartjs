import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private locale = '';

  set localeId(vale: string) {
    this.locale = `${vale}`;
  }

  get localeId() {
    return `${this.locale}`;
  }

  async initializeLocaleImport() {
    try {
      const module = await this.getLocaleImport(this.browserLanguage);
      this.registerLocale(module.default);
    } catch (_) {
      await this.loadShortLocaleImport();
    }
  }

  private get browserLanguage() {
    return `${navigator.languages[0]}`;
  }

  private get shortBrowserLanguage() {
    return navigator.languages[0].split('-')[0];
  }

  private registerLocale(locale: any[]) {
    registerLocaleData(locale);
    this.localeId = locale[0];
  }

  private getLocaleImport(browserLanguage: string) {
    return import(
      /* webpackExclude: /\.d\.ts$/ */
      /* webpackInclude: /(en|es|fr|pt|ja|de|zh)\.js/ */
      /* webpackMode: "lazy" */
      /* webpackChunkName: "locale" */
      `node_modules/@angular/common/locales/${browserLanguage}.js`
    );
  }

  private async loadShortLocaleImport() {
    try {
      const module = await this.getLocaleImport(this.shortBrowserLanguage);
      this.registerLocale(module.default);
    } catch (_) {
      this.registerLocale(localeEn);
    }
  }
}
