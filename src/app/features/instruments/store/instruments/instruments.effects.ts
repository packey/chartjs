import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';

import * as InstrumentsActions from '~instruments/store/instruments/instruments.actions';

@Injectable()
export class InstrumentsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstrumentsActions.getAll),
      switchMap(() => of(InstrumentsActions.getAllSuccess({ items: [] })))
    )
  );

  constructor(private actions$: Actions) {}
}
