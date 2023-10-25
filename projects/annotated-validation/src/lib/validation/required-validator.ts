import 'reflect-metadata';
import { AbstractControl } from '@angular/forms';
import { setError } from './validators';
import { RequiredError } from './errors';

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

export function checkRequired<T extends Record<string, any>>(value: any, obj: T, key: keyof T, control: AbstractControl): RequiredError | null {
  const required = isRequired(obj, key);
  if (required && isEmpty(value)) {
    return setError(control, { type: 'REQUIRED' });
  }
  return null;
}

function isEmpty(value: any): boolean {
  return value === undefined ||
    value === null ||
    value === "";
}
