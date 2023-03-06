import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, SpyObject, createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { TecButtonComponent, TecFatalErrorComponent, TecIconComponent } from '@tecan/ui';
import { MockComponents, MockPipes, MockProvider } from 'ng-mocks';

import { FatalErrorComponent } from '~core/components/fatal-error/fatal-error.component';
import * as CoreActions from '~core/store/core.actions';

describe('FatalErrorComponent', () => {
  let spectator: Spectator<FatalErrorComponent>;
  const createComponent = createComponentFactory({
    component: FatalErrorComponent,
    imports: [RouterTestingModule],
    declarations: [
      MockComponents(TecButtonComponent, TecIconComponent, TecFatalErrorComponent),
      MockPipes(TranslatePipe)
    ],
    providers: [MockProvider(Store), MockProvider(Document)]
  });

  let store: SpyObject<Store>;

  beforeEach(() => {
    spectator = createComponent();

    store = spectator.inject(Store);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should logout', () => {
    spectator.component.onLogout();

    expect(store.dispatch).toHaveBeenCalledOnceWith(CoreActions.logout());
  });
});
