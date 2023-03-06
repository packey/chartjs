import { Action, ActionCreator } from '@ngrx/store';

import * as InstrumentsActions from '~instruments/store/instruments/instruments.actions';
import {
  initialInstrumentsState,
  instrumentsAdapter,
  instrumentsReducer
} from '~instruments/store/instruments/instruments.reducer';
import { ListStateAdapter } from '~shared/store/list-adapter';

describe('Instruments Reducer', () => {
  const initialState = initialInstrumentsState;

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = instrumentsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  const testCases: Array<{
    action: ActionCreator;
    payload: any;
    method: keyof ListStateAdapter<any>;
  }> = [
    { action: InstrumentsActions.getAll, payload: null, method: 'startLoading' },
    { action: InstrumentsActions.getAllSuccess, payload: { items: [] }, method: 'loadItems' },
    { action: InstrumentsActions.getAllError, payload: { error: {} }, method: 'failLoading' }
  ];

  testCases.forEach(({ action, payload, method }) => {
    describe(action.type, () => {
      it(`should call listAdapter.${method}`, () => {
        const actionInstance = action(payload) as Action;
        const spy = spyOn(instrumentsAdapter, method as keyof ListStateAdapter<any>);

        instrumentsReducer(initialState, actionInstance);

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
