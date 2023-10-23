import { isRequiredAndInvalid } from './required-validator';
import { isMinAndInvalid } from './min-validator';
import { AbstractControl } from '@angular/forms';
import { isValidationAndInvalid } from './validate';
import { isMaxAndInvalid } from './max-validator';
import { ValidationError } from './errors';

export function isValid<T extends Record<string, any>>(obj: T, key: keyof T, control: AbstractControl): ValidationError | null {
  const value = control.value;

  const error: ValidationError | null =
    isRequiredAndInvalid(value, obj, key, control) ||
    isMinAndInvalid(value, obj, key, control) ||
    isMaxAndInvalid(value, obj, key, control) ||
    isValidationAndInvalid(value, obj, key, control);

  if (error) {
    return error;
  }

  resetError(control);
  return null;
}

export function setError<T extends ValidationError>(control: AbstractControl, error: T): T {
  control?.setErrors(error);

  return error;
}

function resetError(control: AbstractControl) {
  control.setErrors(null);
}
