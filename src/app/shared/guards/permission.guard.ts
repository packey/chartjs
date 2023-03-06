import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, UrlTree } from '@angular/router';

import { UserProfileService } from '~shared/auth/user-profile.service';
import { ROUTES } from '~shared/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private userProfileService: UserProfileService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.isRoutePermitted(route.data);
  }

  private isRoutePermitted(routeData?: Data): boolean | UrlTree {
    const permission = routeData?.permission;

    return this.userProfileService.hasPermission(permission) || this.router.parseUrl(ROUTES.NOT_FOUND.url);
  }
}
