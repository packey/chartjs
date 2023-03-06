import { combineReducers } from '@ngrx/store';

import { InstrumentsRootState } from '~instruments/store/instruments-root-state.interface';
import * as fromInstrumentsReducer from '~instruments/store/instruments/instruments.reducer';

export const instrumentsFeatureKey = 'instruments';

export const initialState: InstrumentsRootState = {
  instruments: fromInstrumentsReducer.initialInstrumentsState
};

export const reducer = combineReducers({ instruments: fromInstrumentsReducer.instrumentsReducer }, initialState);
