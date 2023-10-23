import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { isValid } from '../../../../annotated-validation/src/lib/validation/validators';
import { ValidationError } from '../../../../annotated-validation/src/lib/validation/errors';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    { provide: NG_VALIDATORS, useExisting: InputComponent, multi: true }
  ]
})
export class InputComponent<T extends object> implements ControlValueAccessor, Validator {

  @Input({ required: true })
  model!: T;

  @Input({ required: true })
  name!: keyof T;

  private onChange = (value: any) => {};
  protected onTouched = () => {};

  value: any = null;

  protected isTouched: boolean = false;
  protected errors: ValidationError | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    const valid = isValid(this.model, this.name, control);
    this.errors = valid;
    return valid;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  writeValue(value: number) {
    this.value = value;
  }

  onValueChange(value: KeyboardEvent) {
    this.onChange((value.target as HTMLInputElement).value);
  }

  markAsTouched() {
    if (this.isTouched) {
      return;
    }

    this.isTouched = true;
    this.onTouched();
  }

}
