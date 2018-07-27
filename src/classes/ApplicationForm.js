import { TextInput, TEXT_INPUT_TYPES, TEXT_INPUT_DEFAULT_VALUES } from './TextInput';

export class ApplicationForm {
  constructor(form = {}) {

    let {
      Comments
    } = form;

    this.Comments = new TextInput(TEXT_INPUT_TYPES.ALPHA_NUMERIC_SPACE, (!Comments && TEXT_INPUT_DEFAULT_VALUES[TEXT_INPUT_TYPES.ALPHA_NUMERIC_SPACE]() ) || Comments, true);
  }
}
