import 'reflect-metadata';
import { NgForm } from '@angular/forms';
import { setError } from './validators';

const minKey = 'minValidator';
interface MinModel {
  min: number;
  strictMinimum?: boolean;
  skipNaN?: boolean;
}
type MinModelOptions = Omit<MinModel, 'min'>

type Key<T> = keyof T;

export function Min(minValue: number, options?: MinModelOptions) {
  return function (target: any, propertyKey: string) {
    // Add the metadata to the property
    Reflect.defineMetadata(minKey, {min: minValue, ...options}, target, propertyKey);
  };
}

function isMin<T extends object>(obj: T, property: Key<T>): MinModel {
  return Reflect.getMetadata(minKey, obj, property as string);
}

export function isMinAndInvalid<T extends Record<string, any>>(value: number, obj: T, key: Key<T>, form: NgForm): boolean {
  const minValidation = isMin(obj, key);

  if (!minValidation || !value) {
    return false;
  }

  if (!minValidation.skipNaN && isNaN(value)) {
    setError(form, key, {type: 'NOT_A_NUMBER'});
    return true;
  }

  const message = minValidation.strictMinimum ? `Cannot be lower than ${ minValidation.min }` : `Cannot be lower or equal than ${ minValidation.min }`;
  const condition = minValidation.strictMinimum ? +value < minValidation.min : +value <= minValidation.min;

  if (condition) {
    setError(form, key, {type: 'MIN_ERROR', minValue: minValidation.min});
    return true;
  }

  return false;
}
