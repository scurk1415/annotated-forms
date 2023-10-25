import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { validate } from '../validation/validators';

@Directive({
  selector: '[validate]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateDirective, multi: true}]
})
export class ValidateDirective<T extends Record<string, any>> implements Validator {

  @Input({required: true, alias: 'validate'}) validateObject!: T;

  @Input({required: true}) name!: keyof T;

  validate(control: AbstractControl): ValidationErrors | null {
    return validate(this.validateObject, this.name, control);
  }
}
