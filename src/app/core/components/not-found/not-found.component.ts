import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as CoreActions from '~core/store/core.actions';

@Component({
  selector: 'capp-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  get canGoHome() {
    return this.activatedRoute.snapshot.data.canGoHome;
  }

  constructor(private store: Store<any>, private activatedRoute: ActivatedRoute, private router: Router) {}

  onLogout() {
    this.store.dispatch(CoreActions.logout());
  }

  onGoHome() {
    this.router.navigateByUrl('/');
  }
}
