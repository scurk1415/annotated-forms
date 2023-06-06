import { Required } from '../../../annotated-validation/src/lib/validation/required-validator';
import { Min } from '../../../annotated-validation/src/lib/validation/min-validator';
import { Validate } from '../../../annotated-validation/src/lib/validation/validate';
import { Max } from '../../../annotated-validation/src/lib/validation/max-validator';

export class Item {

  @Required()
  name: string = '';

  @Required()
  @Validate({
    isValid: (item: any) => {
      return item.name === item.surname;
    },
    args: {
      message: 'Not Working'
    }
  })
  surname: string = '';

  @Required()
  @Min(18)
  @Max(20)
  age: number | null = null;

}
