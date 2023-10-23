import { isRequiredAndInvalid } from './required-validator';
import { isMinAndInvalid } from './min-validator';
import { AbstractControl } from '@angular/forms';
import { isValidationAndInvalid } from './validate';
import { isMaxAndInvalid } from './max-validator';
import { ValidationError } from './errors';

export function isValid<T extends Record<string, any>>(obj: T, key: keyof T, control: AbstractControl): any {

  const value = control.value;

  if (isRequiredAndInvalid(value, obj, key, control)) {
    return { type: 'REQUIRED' };
  }

  if (isMinAndInvalid(value, obj, key, control)) {
    return false;
  }

  if (isMaxAndInvalid(value, obj, key, control)) {
    return false;
  }

  if (isValidationAndInvalid(value, obj, key, control)) {
    return false;
  }

  resetError(control);

  return null;
}

export function setError<K>(control: AbstractControl, error: ValidationError) {
  control?.setErrors(error);
}

function resetError(control: AbstractControl) {
  control.setErrors(null);
}
