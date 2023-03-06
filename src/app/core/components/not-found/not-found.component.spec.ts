import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { TecNotFoundComponent } from '@tecan/ui';
import { MockComponents, MockPipes } from 'ng-mocks';

import { NotFoundComponent } from '~core/components/not-found/not-found.component';
import * as CoreActions from '~core/store/core.actions';

describe('NotFoundComponent', () => {
  let spectator: Spectator<NotFoundComponent>;
  let store: MockStore;

  const createComponent = createComponentFactory({
    component: NotFoundComponent,
    imports: [RouterTestingModule],
    declarations: [MockComponents(TecNotFoundComponent), MockPipes(TranslatePipe)],
    providers: [provideMockStore({})]
  });

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject<any>(Store);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should dispatch logout, when onLogout is called', () => {
    spectator.component.onLogout();

    expect(store.dispatch).toHaveBeenCalledOnceWith(CoreActions.logout());
  });

  it('should navigate to home, when goHome is called', () => {
    const router = spectator.inject(Router);
    spyOn(router, 'navigateByUrl');

    spectator.component.onGoHome();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/');
  });
});
