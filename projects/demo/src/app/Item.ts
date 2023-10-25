import { Required } from '../../../annotated-validation/src/lib/validation/required-validator';
import { Validate } from '../../../annotated-validation/src/lib/validation/validate';

export class Item {

  @Required()
  name: string = 'test';

  @Required()
  @Validate({
    isValid: (value: string, item: any) => {
      console.log(item);
      return item.name === item.surname;
    },
    args: {
      message: 'Not Working'
    }
  })
  surname: string = '';

}
