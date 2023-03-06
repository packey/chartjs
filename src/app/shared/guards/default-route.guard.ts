import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { UserProfileService } from '~shared/auth/user-profile.service';
import { MENU_ITEMS } from '~shared/constants/menu-items';
import { ROUTES } from '~shared/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteGuard implements CanActivate {
  constructor(private userProfileService: UserProfileService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const firstPermitted = MENU_ITEMS.find(({ permission }) => this.userProfileService.hasPermission(permission));
    const redirectUrl = firstPermitted?.routerLink ?? ROUTES.NOT_FOUND.url;

    return this.router.parseUrl(redirectUrl);
  }
}
