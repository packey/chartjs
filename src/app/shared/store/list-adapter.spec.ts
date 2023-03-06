import { ListStateAdapter } from '~shared/store/list-adapter';
import { ListState } from '~shared/store/list-state.interface';

describe('ListStateAdapter', () => {
  let adapter: ListStateAdapter<string>;
  const initialState: ListState<string> = {
    isLoading: false,
    items: [],
    error: null
  };

  beforeEach(() => {
    adapter = new ListStateAdapter();
  });

  it('should get initial state', () => {
    expect(adapter.getInitialState({})).toEqual(initialState);
  });

  it('should start loading items', () => {
    expect(adapter.startLoading({ ...initialState, error: {} as any })).toEqual({
      isLoading: true,
      items: [],
      error: null
    });
  });

  it('should complete loading', () => {
    const state: ListState<string> = { ...initialState, isLoading: true, error: {} as any };

    expect(adapter.completeLoading(state)).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  it('should load items', () => {
    const state: ListState<string> = { ...initialState, isLoading: true };

    expect(adapter.loadItems(state, ['item'])).toEqual({
      isLoading: false,
      items: ['item'],
      error: null
    });
  });

  it('should fail loading', () => {
    const state: ListState<string> = { ...initialState, isLoading: true };

    expect(adapter.failLoading(state, {} as any)).toEqual({
      isLoading: false,
      items: [],
      error: {} as any
    });
  });

  it('should select is loading', () => {
    const state: ListState<string> = { ...initialState, isLoading: true };
    const { selectIsLoading } = adapter.getSelectors();

    expect(selectIsLoading(state)).toBeTrue();
  });

  it('should select items', () => {
    const state: ListState<string> = { ...initialState, items: ['item-1'] };
    const { selectItems } = adapter.getSelectors();

    expect(selectItems(state).length).toBe(1);
  });

  it('should select error', () => {
    const state: ListState<string> = { ...initialState, error: {} as any };
    const { selectError } = adapter.getSelectors();

    expect(selectError(state)).toBeDefined();
  });

  describe('selectHasNoResults', () => {
    [
      { state: { ...initialState, isLoading: true, items: [] }, hasNoResults: false },
      { state: { ...initialState, isLoading: false, items: [] }, hasNoResults: true },
      { state: { ...initialState, isLoading: true, items: ['item-1'] }, hasNoResults: false },
      { state: { ...initialState, isLoading: false, items: ['item-1'] }, hasNoResults: false }
    ].forEach(({ state, hasNoResults }) => {
      it(`should return ${hasNoResults} when isLoading is ${state.isLoading} and there are ${state.items.length} items`, () => {
        const { selectHasNoResults } = adapter.getSelectors();

        expect(selectHasNoResults(state)).toBe(hasNoResults);
      });
    });
  });

  describe('selectHasError', () => {
    [
      { state: { ...initialState, isLoading: true, error: null }, hasError: false },
      { state: { ...initialState, isLoading: false, error: null }, hasError: false },
      { state: { ...initialState, isLoading: true, error: {} as any }, hasError: false },
      { state: { ...initialState, isLoading: false, error: {} as any }, hasError: true }
    ].forEach(({ state, hasError }) => {
      it(`should return ${hasError} when isLoading is ${state.isLoading} and there is ${
        hasError ? 'an' : 'no'
      } error`, () => {
        const { selectHasError } = adapter.getSelectors();

        expect(selectHasError(state)).toBe(hasError);
      });
    });
  });
});
