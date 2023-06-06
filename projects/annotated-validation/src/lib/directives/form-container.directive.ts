import { Directive, Input, HostListener, Self, Output, EventEmitter } from '@angular/core';
import { isValid } from '../validation/validators';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form[item]',
  standalone: true,
})
export class FormContainerDirective<T extends object>  {

  @Input({required: true})
  item!: T

  @Output()
  formSubmit: EventEmitter<T> = new EventEmitter<T>();

  constructor(@Self() private form: NgForm) {}

  @HostListener('submit')
  onSubmit() {
    const valid = isValid(this.item, this.form);

    if (!valid) {
      return;
    }

    this.formSubmit.emit(this.item);
  }

}
