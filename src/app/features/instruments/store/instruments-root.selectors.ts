import { createFeatureSelector } from '@ngrx/store';

import { InstrumentsRootState } from '~instruments/store/instruments-root-state.interface';
import { instrumentsFeatureKey } from '~instruments/store/instruments-root.reducer';

export const selectInstrumentsRootState = createFeatureSelector<InstrumentsRootState>(instrumentsFeatureKey);
