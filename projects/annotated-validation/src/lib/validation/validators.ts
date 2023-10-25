import { checkRequired } from './required-validator';
import { checkMin } from './min-validator';
import { checkValidate } from './validate';
import { checkMax } from './max-validator';
import { ValidationError } from './errors';

export function validate<T extends Record<string, any>>(obj: T, key: keyof T, value: any): ValidationError | null {
  const error: ValidationError | null = checkForErrors(value, obj, key);

  if (error) {
    return error;
  }

  return null;
}

function checkForErrors<T extends Record<string, any>>(value: any, obj: T, key: keyof T): ValidationError | null {
  return checkRequired(value, obj, key) ||
    checkMin(value, obj, key) ||
    checkMax(value, obj, key) ||
    checkValidate(value, obj, key);
}
