import "reflect-metadata";
import { NgForm } from '@angular/forms';
import { setError } from './validators';

const requiredKey = 'requiredValidator';
interface RequiredModel {
  isRequired: boolean;
}

export function Required() {
  return function (target: any, propertyKey: string) {
    // Add the metadata to the property
    Reflect.defineMetadata(requiredKey, { isRequired: true }, target, propertyKey);
  };
}

function isRequired<T extends Record<string, any>>(obj: T, property: keyof T): RequiredModel {
  return Reflect.getMetadata(requiredKey, obj, property as string);
}

export function isRequiredAndInvalid<T extends Record<string, any>>(value: any, obj: T, key: keyof T, form: NgForm): boolean {
  const required = isRequired(obj, key);
  if (required && isEmpty(value)) {
    setError(form, key, { type: 'REQUIRED' });
    return true;
  }
  return false;
}

function isEmpty(value: any): boolean {
  return value === undefined ||
    value === null ||
    value === "";
}
