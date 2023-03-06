import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CoreActions from '~core/store/core.actions';

@Component({
  selector: 'capp-fatal-error',
  templateUrl: './fatal-error.component.html',
  styleUrls: ['./fatal-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FatalErrorComponent {
  constructor(private store: Store<any>, @Inject(DOCUMENT) private document: Document) {}

  onLogout() {
    this.store.dispatch(CoreActions.logout());
  }

  onTryAgain() {
    this.document.defaultView!.location.href = '/';
  }
}
