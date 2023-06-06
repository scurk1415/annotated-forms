import { isRequiredAndInvalid } from './required-validator';
import { isMinAndInvalid } from './min-validator';
import { NgForm, ValidationErrors } from '@angular/forms';
import { isValidationAndInvalid } from './validate';
import { isMaxAndInvalid } from './max-validator';
import { ValidationError } from './errors';

export function isValid<T extends Record<string, any>>(obj: T, form: NgForm): boolean {

  let isModelValid = true;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (isRequiredAndInvalid(value, obj, key, form)) {
      isModelValid = false;
      continue;
    }

    if (isMinAndInvalid(value, obj, key, form)) {
      isModelValid = false;
      continue;
    }

    if (isMaxAndInvalid(value, obj, key, form)) {
      isModelValid = false;
      continue;
    }

    if (isValidationAndInvalid(value, obj, key, form)) {
      isModelValid = false;
      continue;
    }

    resetError(form, key);
  }

  return isModelValid;
}

export function setError<K>(form: NgForm, key: K, error: ValidationError) {
  form.control.get(key as string)?.setErrors(error);
}

function resetError<K>(form: NgForm, key: K) {
  form.control.get(key as string)?.setErrors(null);
}
