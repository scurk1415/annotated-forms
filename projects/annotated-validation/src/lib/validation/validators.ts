import { checkRequired } from './required-validator';
import { checkMin } from './min-validator';
import { AbstractControl } from '@angular/forms';
import { checkValidate } from './validate';
import { checkMax } from './max-validator';
import { ValidationError } from './errors';

export function validate<T extends Record<string, any>>(obj: T, key: keyof T, control: AbstractControl): ValidationError | null {
  const value = control.value;

  const error: ValidationError | null = checkForErrors(value, obj, key, control);

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

function checkForErrors<T extends Record<string, any>>(value: any, obj: T, key: keyof T, control: AbstractControl): ValidationError | null {
  return checkRequired(value, obj, key, control) ||
    checkMin(value, obj, key, control) ||
    checkMax(value, obj, key, control) ||
    checkValidate(value, obj, key, control);
}
