import 'reflect-metadata';
import { AbstractControl } from '@angular/forms';
import { setError } from './validators';
import { NumberError, MaxError } from './errors';

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

export function isMaxAndInvalid<T extends Record<string, any>>(value: number, obj: T, key: Key<T>, control: AbstractControl): MaxError | NumberError | null {
  const maxValidation = isMax(obj, key);

  if (!maxValidation || !value) {
    return null;
  }

  if (!maxValidation.skipNaN && isNaN(value)) {
    return setError(control, {type: 'NOT_A_NUMBER'});
  }

  const condition = maxValidation.strictMaximum ? +value > maxValidation.max : +value >= maxValidation.max;

  if (condition) {
    return setError(control, {type: 'MAX_ERROR', params: {maxValue: maxValidation.max}});
  }

  return null;
}
