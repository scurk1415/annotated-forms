import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from './Item';
import { InputComponent } from './input/input.component';
import { ValidateDirective } from '../../../annotated-validation/src/lib/directives/validate.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ValidateDirective]
})
export class AppComponent {
  model: Item = new Item();
}
