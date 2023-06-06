import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationError } from '../validation/errors';

@Directive({
  selector: '[ngModel]',
  standalone: true,
  exportAs: 'formError'
})
export class FormInputErrorDirective {

  constructor(private control: NgControl) { }

  get error(): ValidationError {
    return this.control.errors as ValidationError;
  }

  get invalid(): boolean | null {
    return this.control.invalid;
  }

  get valid(): boolean | null {
    return this.control.valid;
  }

}
