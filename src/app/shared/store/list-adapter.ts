import { HttpErrorResponse } from '@angular/common/http';

import { ListState } from '~shared/store/list-state.interface';

export class ListStateAdapter<T> {
  getInitialState<TState>(additionalState: TState): ListState<T> & TState {
    return {
      isLoading: false,
      error: null,
      items: [],
      ...additionalState
    };
  }

  startLoading<TState extends ListState<T>>(state: TState): TState {
    return { ...state, isLoading: true, error: null };
  }

  completeLoading<TState extends ListState<T>>(state: TState): TState {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  }

  loadItems<TState extends ListState<T>>(state: TState, items: T[]): TState {
    return {
      ...state,
      items,
      isLoading: false,
      error: null
    };
  }

  failLoading<TState extends ListState<T>>(state: TState, error: HttpErrorResponse): TState {
    return { ...state, error, isLoading: false };
  }

  getSelectors() {
    return {
      selectIsLoading: (state: ListState<T>) => state.isLoading,
      selectItems: (state: ListState<T>) => state.items,
      selectError: (state: ListState<T>) => state.error,
      selectHasNoResults: (state: ListState<T>) => !state.isLoading && state.items.length === 0,
      selectHasError: (state: ListState<T>) => !state.isLoading && state.error != null
    };
  }
}

export const createListStateAdapter = <T>(): ListStateAdapter<T> => {
  return new ListStateAdapter();
};
