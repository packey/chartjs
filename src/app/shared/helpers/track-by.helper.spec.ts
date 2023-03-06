import { trackById } from '~shared/helpers/track-by.helper';

describe('trackById', () => {
  it('should return id', () => {
    expect(trackById(1, { id: 'id-2' })).toBe('id-2');
  });
});
