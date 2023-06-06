import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Item } from './Item';
import { FormContainerDirective } from '../../../annotated-validation/src/lib/directives/form-container.directive';
import { FormInputErrorDirective } from '../../../annotated-validation/src/lib/directives/form-input-error.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FormContainerDirective, FormInputErrorDirective]
})
export class AppComponent {
  title = 'template-forms';

  model: Item = new Item();

  check(value: NgForm) {
    console.log(value);
  }
}
