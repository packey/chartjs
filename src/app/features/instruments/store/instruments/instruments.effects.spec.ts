import { fakeAsync, tick } from '@angular/core/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import * as InstrumentsActions from '~instruments/store/instruments/instruments.actions';
import { InstrumentsEffects } from '~instruments/store/instruments/instruments.effects';

describe('InstrumentsEffects', () => {
  let actions$: Observable<any>;
  let spectator: SpectatorService<InstrumentsEffects>;

  const createEffect = createServiceFactory({
    service: InstrumentsEffects,
    providers: [provideMockActions(() => actions$)]
  });

  beforeEach(() => {
    spectator = createEffect();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should dispatch getAllSuccess on success', fakeAsync(() => {
      actions$ = of(InstrumentsActions.getAll());
      let dispatchedAction: any;

      spectator.service.getAll$.subscribe(result => (dispatchedAction = result));
      tick();

      expect(dispatchedAction).toEqual(InstrumentsActions.getAllSuccess({ items: [] }));
    }));
  });
});
