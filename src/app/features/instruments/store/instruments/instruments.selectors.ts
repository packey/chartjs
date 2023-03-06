import { createSelector } from '@ngrx/store';

import { selectInstrumentsRootState } from '~instruments/store/instruments-root.selectors';
import * as fromInstruments from '~instruments/store/instruments/instruments.reducer';

export const selectInstrumentsState = createSelector(selectInstrumentsRootState, state => state.instruments);

export const selectItems = createSelector(selectInstrumentsState, fromInstruments.selectItems);

export const selectIsLoading = createSelector(selectInstrumentsState, fromInstruments.selectIsLoading);

export const selectHasNoResults = createSelector(selectInstrumentsState, fromInstruments.selectHasNoResults);
