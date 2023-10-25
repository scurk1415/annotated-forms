import 'reflect-metadata';
import { ValidateError } from './errors';

const validateKey = 'customValidate';
interface ValidateModel {
  isValid: <T>(value: any, item: T) => boolean;
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

export function checkValidate<T extends Record<string, any>>(value: any, obj: T, key: keyof T): ValidateError | null {
  const validate = isValidate(obj, key);
  if (!validate) {
    return null;
  }

  if (Array.isArray(validate)) {
    for (const validateElement of validate) {
      if (!validateElement.isValid(obj)) {
        return { type: 'VALIDATE', ...validateElement.args };
      }
    }
    return null;
  }

  if (!validate.isValid(value, obj)) {
    return { type: 'VALIDATE', params: {...validate.args} };
  }

  return null;
}
