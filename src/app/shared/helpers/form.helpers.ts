import { AbstractControl } from '@angular/forms';

export const getFirstError = (formField: AbstractControl, translationKeyPrefix: string): string => {
  return formField?.dirty && formField.errors && Object.keys(formField.errors).length
    ? `${translationKeyPrefix}.${Object.keys(formField.errors)[0]}`
    : '';
};
