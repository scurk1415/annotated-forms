import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validator, ValidationErrors, NG_VALIDATORS, NgForm } from '@angular/forms';
import { validate } from '../../../../annotated-validation/src/lib/validation/validators';
import { ValidationError } from '../../../../annotated-validation/src/lib/validation/errors';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    { provide: NG_VALIDATORS, useExisting: InputComponent, multi: true }
  ]
})
export class InputComponent<T extends Record<string, any>> implements ControlValueAccessor, Validator {

  @Input({ required: true })
  item!: T;

  @Input({ required: true })
  name!: keyof T;

  protected value: any;

  protected isTouched: boolean = false;
  protected errors: ValidationError | null = null;

  private onChange = (value: any): void => {};
  protected onTouched = (): void => {};

  constructor(protected form: NgForm) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const valid = validate(this.item, this.name, control);
    this.errors = valid;
    console.log(this.errors);
    return valid;
  }

  registerOnChange(fn: (value: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  onValueChange(event: KeyboardEvent) {
    this.onChange((event.target as HTMLInputElement).value);
  }

  markAsTouched() {
    if (this.isTouched) {
      return;
    }

    this.isTouched = true;
    this.onTouched();
  }

}
