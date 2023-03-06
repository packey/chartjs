import { getFirstError } from '~shared/helpers/form.helpers';

describe('getFirstError', () => {
  [
    { value: { dirty: true, errors: { required: 'test' } }, expected: 'users.validation.required' },
    { value: { errors: { required: 'test' } }, expected: '' },
    { value: { errors: {} }, expected: '' },
    { value: {}, expected: '' },
    { value: null, expected: '' }
  ].forEach(c =>
    it(`should return ${c.expected} when it receives ${JSON.stringify(c.value)} as an input`, () => {
      expect(getFirstError(c.value as any, 'users.validation')).toBe(c.expected);
    })
  );
});
