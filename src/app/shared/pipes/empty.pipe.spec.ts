import { PipeTransform } from '@angular/core';

import { EmptyPipe } from '~shared/pipes/empty.pipe';

describe('EmptyPipe', () => {
  let pipe: PipeTransform;

  beforeAll(() => {
    pipe = new EmptyPipe();
  });

  const cases = [
    { value: 'test', emptyLabel: 'best', expected: 'test' },
    { value: 'test', expected: 'test' },
    { emptyLabel: 'best', expected: 'best' },
    { value: null, emptyLabel: 'best', expected: 'best' },
    { expected: '' },
    { value: null, expected: '' }
  ];

  cases.forEach(c => {
    it(`should return ${c.expected} when try to print ${c.value} and pass empty label ${c.emptyLabel}...`, () => {
      expect(pipe.transform(c.value, c.emptyLabel)).toBe(c.expected);
    });
  });
});
