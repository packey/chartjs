import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserProfile } from '~shared/auth/model/user-profile.interface';
import { AppConfigService } from '~shared/configuration/app-config.service';

@Injectable({ providedIn: 'root' })
export class UserProfileApi {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  getMyProfile(): Observable<UserProfile> {
    const url = [this.appConfig.baseApiPath, 'Users', 'me'].join('/');

    return this.http.get<UserProfile>(url);
  }
}
