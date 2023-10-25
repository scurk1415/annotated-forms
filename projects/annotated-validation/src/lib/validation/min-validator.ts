import 'reflect-metadata';
import { MinError, NumberError } from './errors';

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

export function checkMin<T extends Record<string, any>>(value: number, obj: T, key: Key<T>): MinError | NumberError | null {
  const minValidation = isMin(obj, key);

  if (!minValidation || !value) {
    return null;
  }

  if (!minValidation.skipNaN && isNaN(value)) {
    return {type: 'NOT_A_NUMBER'};
  }

  const condition = minValidation.strictMinimum ? +value < minValidation.min : +value <= minValidation.min;

  if (condition) {
    return {type: 'MIN_ERROR', params: {minValue: minValidation.min}};
  }

  return null;
}
