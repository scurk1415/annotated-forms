import 'reflect-metadata';
import { AbstractControl } from '@angular/forms';
import { setError } from './validators';

const validateKey = 'customValidate';
interface ValidateModel {
  isValid: <T>(item: T) => boolean;
  args?: {
    [key: string]: any
  };
}

export function Validate(validate: ValidateModel) {
  return function (target: any, propertyKey: string) {
    // Add the metadata to the property
    Reflect.defineMetadata(validateKey, validate, target, propertyKey);
  };
}

function isValidate<T extends Record<string, any>>(obj: T, key: keyof T): ValidateModel {
  return Reflect.getMetadata(validateKey, obj, key as string);
}

export function isValidationAndInvalid<T extends Record<string, any>>(value: any, obj: T, key: keyof T, control: AbstractControl): boolean {
  const validate = isValidate(obj, key);
  if (!validate) {
    return false;
  }

  if (Array.isArray(validate)) {
    for (const validateElement of validate) {
      if (!validateElement.isValid(obj)) {
        setError(control, { type: 'VALIDATE', ...validateElement.args });
        return true;
      }
    }
    return false;
  }

  if (!validate.isValid(obj)) {
    setError(control, { type: 'VALIDATE', params: {...validate.args} });
    return true;
  }

  return false;
}
