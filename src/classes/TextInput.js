import moment from 'moment';

export const TEXT_INPUT_TYPES = {
  ALPHA_NUMERIC: Symbol('ALPHA_NUMERIC'),
  ALPHA_NUMERIC_SPACE: Symbol('ALPHA_NUMERIC_SPACE'),
  TEXT: Symbol('TEXT'),
  PASSWORD: Symbol('PASSWORD'),
  ARRAY: Symbol('ARRAY'),
  BOOLEAN: Symbol('BOOLEAN'),
  DATE: Symbol('DATE'),
  NUMBER: Symbol('NUMBER')
};

export const TEXT_INPUT_DEFAULT_VALUES = {
  [TEXT_INPUT_TYPES.ALPHA_NUMERIC]: () => '',
  [TEXT_INPUT_TYPES.ALPHA_NUMERIC_SPACE]: () => '',
  [TEXT_INPUT_TYPES.TEXT]: () => '',
  [TEXT_INPUT_TYPES.PASSWORD]: () => '',
  [TEXT_INPUT_TYPES.ARRAY]: () => [],
  [TEXT_INPUT_TYPES.BOOLEAN]: () => false,
  [TEXT_INPUT_TYPES.DATE]: () => moment(),
  [TEXT_INPUT_TYPES.NUMBER]: () => ''
};

export class TextInput {
  constructor(type = '', value, required = false) {
    if (!isInputType(type)) {
      return this._invalidInput = true;
    }

    this.type = type;
    this.value = value || TEXT_INPUT_DEFAULT_VALUES[type]();
    this.required = !!required;
    this.dirty = false;
    this.error = false;
    this.errorMessage = '';
  }

  fromInput(input) {
    this._invalidInput = input._invalidInput || false;
    if (this._invalidInput) { return; }

    this.type = input.type;
    this.value = input.value || TEXT_INPUT_DEFAULT_VALUES[this.type]();
    this.required = !!input.required;
    this.dirty = !!input.dirty;
    this.error = !!input.error;
    this.errorMessage = input.errorMessage || '';
  }

  onChange(value) {
    if (this._invalidInput) { return; }
    const filter = onChangeFilter[this.type] || (() => {});
    this.value = filter(value);
    this.dirty = true;
    this.checkValidity();
  }

  onBlur() {
    this.checkValidity();
  }

  checkValidity() {
    const checkValidity = onValidityCheck[this.type] || (() => {});
    checkValidity(this);
  }

  setError(message) {
    this.dirty = true;
    this.error = true;
    this.errorMessage = message;
  }

  setRequiredError(errorText) {
    this.dirty = true;
    this.error = true;
    this.errorMessage = errorText;
  }

  setValid() {
    this.dirty = true;
    this.error = false;
    this.errorMessage = '';
  }
}

const isInputType = (type) => {
  let flag = false;
  Object.keys(TEXT_INPUT_TYPES).forEach(key => flag = flag || (TEXT_INPUT_TYPES[key] === type));
  return flag;
};

const onChangeFilter = {
  [TEXT_INPUT_TYPES.ALPHA_NUMERIC]: function(value) {
    return value.trim().replace(/[^a-zA-Z0-9]/g, '');
  },

  [TEXT_INPUT_TYPES.ALPHA_NUMERIC_SPACE]: function(value) {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  },

  [TEXT_INPUT_TYPES.TEXT]: function(value) {
    return value;
  },

  [TEXT_INPUT_TYPES.PASSWORD]: function(value) {
    return value.trim();
  },

  [TEXT_INPUT_TYPES.ARRAY]: function(value) {
    return (value && value.length && [...value]) || value;
  },

  [TEXT_INPUT_TYPES.BOOLEAN]: function(value) {
    return value;
  },

  [TEXT_INPUT_TYPES.DATE]: function(value) {
    return value;
  },

 [TEXT_INPUT_TYPES.NUMBER]:function(value){
   var patt = new RegExp(/[+-]?([0-9]*[.])?[0-9]+/);
   if(!patt.test(value)){
     return '';
   }
   return value;
 }

};

const onValidityCheck = {
  [TEXT_INPUT_TYPES.ALPHA_NUMERIC]: function(_this) {


    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value) {
      return _this.setRequiredError("Field Cannot be Empty");
    }

    _this.setValid();
  },

  [TEXT_INPUT_TYPES.ALPHA_NUMERIC_SPACE]: function(_this) {
    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value) {
      return _this.setRequiredError("Field Cannot be Empty");
    }

    console.log(_this.value.length);

    if(_this.value.length >90){
      return _this.setRequiredError("Maximum 80 Characters Allowed");
    }

    _this.setValid();
  },

  [TEXT_INPUT_TYPES.TEXT]: function(_this) {
    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value) {
      return _this.setRequiredError("Field Cannot be Empty");
    }
    _this.setValid();
  },

  [TEXT_INPUT_TYPES.PASSWORD]: function(_this) {
    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value) {
      return _this.setRequiredError("Field Cannot be Empty");
    }
    _this.setValid();
  },

  [TEXT_INPUT_TYPES.ARRAY]: function(_this) {
    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value.length) {
      return _this.setRequiredError("Field Cannot be Empty");
    }
    _this.setValid();
  },

  [TEXT_INPUT_TYPES.BOOLEAN]: function(_this) {
    _this.setValid();
  },

  [TEXT_INPUT_TYPES.DATE]: function(_this) {
    _this.setValid();
  },

  [TEXT_INPUT_TYPES.NUMBER]: function(_this) {
    if (_this._invalidInput) { return; }
    if (_this.required && !_this.value.length) {
      return _this.setRequiredError();
    }
    _this.setValid();
  }

};
