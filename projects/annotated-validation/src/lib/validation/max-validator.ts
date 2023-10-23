import 'reflect-metadata';
import { AbstractControl } from '@angular/forms';
import { setError } from './validators';

const maxKey = 'maxValidator';

interface MaxModel {
  max: number;
  strictMaximum?: boolean;
  skipNaN?: boolean;
}

type MaxModelOptions = Omit<MaxModel, 'max'>

type Key<T> = keyof T;

export function Max(maxValue: number, options?: MaxModelOptions) {
  return function (target: any, propertyKey: string) {
    // Add the metadata to the property
    Reflect.defineMetadata(maxKey, {max: maxValue, ...options}, target, propertyKey);
  };
}

function isMax<T extends object>(obj: T, property: Key<T>): MaxModel {
  return Reflect.getMetadata(maxKey, obj, property as string);
}

export function isMaxAndInvalid<T extends Record<string, any>>(value: number, obj: T, key: Key<T>, control: AbstractControl): boolean {
  const maxValidation = isMax(obj, key);

  if (!maxValidation || !value) {
    return false;
  }

  if (!maxValidation.skipNaN && isNaN(value)) {
    setError(control, {type: 'NOT_A_NUMBER'});
    return true;
  }

  const message = maxValidation.strictMaximum ? `Cannot be higher than ${ maxValidation.max }` : `Cannot be higher or equal than ${ maxValidation.max }`;
  const condition = maxValidation.strictMaximum ? +value > maxValidation.max : +value >= maxValidation.max;

  if (condition) {
    setError(control, {type: 'MAX_ERROR', params: {maxValue: maxValidation.max}});
    return true;
  }

  return false;
}
