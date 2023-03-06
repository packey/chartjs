import * as fromInstrumentsRoot from '~instruments/store/instruments-root.reducer';
import { selectInstrumentsRootState } from '~instruments/store/instruments-root.selectors';

describe('InstrumentsRoot Selectors', () => {
  const { initialState } = fromInstrumentsRoot;

  it('should select the feature state', () => {
    const result = selectInstrumentsRootState.projector(initialState);

    expect(result).toBe(initialState);
  });
});
