import { initialState } from '~instruments/store/instruments-root.reducer';
import { initialInstrumentsState } from '~instruments/store/instruments/instruments.reducer';
import * as fromInstruments from '~instruments/store/instruments/instruments.selectors';

describe('Instruments Selectors', () => {
  it('should select the instruments state', () => {
    const state = fromInstruments.selectInstrumentsState.projector(initialState);

    expect(state).toBe(initialInstrumentsState);
  });
});
