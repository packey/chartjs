import { createReducer, on } from '@ngrx/store';

import * as InstrumentsActions from '~instruments/store/instruments/instruments.actions';
import { createListStateAdapter } from '~shared/store/list-adapter';
import { ListState } from '~shared/store/list-state.interface';

export const instrumentsAdapter = createListStateAdapter<any>();

export const initialInstrumentsState: ListState<any> = {
  ...instrumentsAdapter.getInitialState({})
};

export const instrumentsReducer = createReducer(
  initialInstrumentsState,
  on(InstrumentsActions.getAll, state => instrumentsAdapter.startLoading(state)),
  on(InstrumentsActions.getAllSuccess, (state, { items }) => instrumentsAdapter.loadItems(state, items)),
  on(InstrumentsActions.getAllError, (state, { error }) => instrumentsAdapter.failLoading(state, error))
);

export const { selectItems, selectIsLoading, selectHasNoResults } = instrumentsAdapter.getSelectors();
