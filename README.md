# validatorjs-riot

[![npm version](https://badge.fury.io/js/validatorjs-riot.svg)](https://badge.fury.io/js/validatorjs-riot)
[![Build Status](https://travis-ci.org/black-trooper/validatorjs-riot.svg?branch=master)](https://travis-ci.org/black-trooper/validatorjs-riot)
[![Coverage Status](https://coveralls.io/repos/github/black-trooper/validatorjs-riot/badge.svg)](https://coveralls.io/github/black-trooper/validatorjs-riot)
[![GitHub license](https://img.shields.io/github/license/black-trooper/validatorjs-riot.svg)](https://github.com/black-trooper/validatorjs-riot/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/validatorjs-riot.svg)](https://www.npmtrends.com/validatorjs-riot)

[validatorjs](https://github.com/skaterdav85/validatorjs) for Riot.

## Why use validatorjs-riot?

* Readable and declarative validation rules.
* Error messages with multilingual support.
* AMD/Require.js and CommonJS/Browserify support.

## Installation

```
npm install validatorjs-riot
```

```js
// using ES6 modules
import Validator from 'validatorjs-riot';
 
// using CommonJS modules
let Validator = require('validatorjs-riot');
```

### Basic Usage

To apply validation rules, set _ref_ and _validate_ attributes.

```html
<input type="text" ref="name" validate="required" value="" />
<input type="text" ref="email" validate="required|email" value="not an email address.com" />

<button type="button" onclick="{ register }">register</button>

<script>
let Validator = require('validatorjs-riot');

this.register = function() {
  let validation = new Validator(this.refs);

  console.log(validation.fails()); // true
  console.log(validation.passes()); // false
  console.log(validation.errors.first('name')); // 'The name format is invalid.'
  console.log(validation.errors.get('name')); // returns an array of all name error messages

  if (validation.fails()) {
    this.errors = validation.errors.all()
    return
  }
  // ...
}
</script>
```

To add a class to error fields or to display error messages

```html
<input type="text" ref="name" validate="required" class="{ has-error : errors.name }" value="" />
<span if="{ errors.name }" each="{ error in errors.name }">{ error }</span>
<input type="text" ref="email" validate="required|email" class="{ has-error : errors.name }"
  value="not an email address.com" />
<span if="{ errors.email }" each="{ error in errors.email }">{ error }</span>
```

### Available Rules

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

#### accepted

The field under validation must be yes, on, 1 or true. This is useful for validating "Terms of Service" acceptance.

#### after:date

The field under validation must be after the given date.

#### after_or_equal:date

The field unter validation must be after or equal to the given field

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### before:date

The field under validation must be before the given date.

#### before_or_equal:date

The field under validation must be before or equal to the given date.

#### between:min,max

The field under validation must have a size between the given min and max. Strings, numerics, and files are evaluated in the same fashion as the size rule.

#### boolean

The field under validation must be a boolean value of the form `true`, `false`, `0`, `1`, `'true'`, `'false'`, `'0'`, `'1'`,

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### date

The field under validation must be a valid date format which is acceptable by Javascript's `Date` object.

#### digits:value

The field under validation must be numeric and must have an exact length of value.

#### different:attribute

The given field must be different than the field under validation.

#### email

The field under validation must be formatted as an e-mail address.

#### hex
The field under validation should be a hexadecimal format. Useful in combination with other rules, like `hex|size:6` for hex color code validation.

#### in:foo,bar,...

The field under validation must be included in the given list of values. The field can be an array or string.

#### integer

The field under validation must have an integer value.

#### max:value

Validate that an attribute is no greater than a given size

_Note: Maximum checks are inclusive._

#### min:value

Validate that an attribute is at least a given size.

_Note: Minimum checks are inclusive._

#### not_in:foo,bar,...

The field under validation must not be included in the given list of values.

#### numeric

Validate that an attribute is numeric. The string representation of a number will pass.

#### required

Checks if the length of the String representation of the value is >

#### required_if:anotherfield,value

The field under validation must be present and not empty if the anotherfield field is equal to any value.

#### required_unless:anotherfield,value

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

#### required_with:foo,bar,...

The field under validation must be present and not empty only if any of the other specified fields are present.

#### required_with_all:foo,bar,...

The field under validation must be present and not empty only if all of the other specified fields are present.

#### required_without:foo,bar,...

The field under validation must be present and not empty only when any of the other specified fields are not present.

#### required_without_all:foo,bar,...

The field under validation must be present and not empty only when all of the other specified fields are not present.

#### same:attribute

The given field must match the field under validation.

#### size:value

The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.

#### string

The field under validation must be a string.

#### url

Validate that an attribute has a valid URL format

#### regex:pattern

The field under validation must match the given regular expression.

**Note**: When using the ``regex`` pattern, it may be necessary to specify rules in pattern attribute instead of using pipe delimiters, especially if the regular expression contains a pipe character.
For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.

#### Example - Regex validation

```html
<input type="text" ref="name" validate="required|size:3" value="Doe" />
<input type="text" ref="salary" validate="required" pattern="/^(?!0.00)\d\{1,3\}(,\d\{3\})*(.\d\d)?$/" value="10,000.00" />
<input type="text" ref="salary" validate="required" pattern="/^(19|20)[\d]\{2,2\}$/" value="1980" />
```

### Error Messages

This constructor will automatically generate error messages for validation rules that failed.

If there are errors, the Validator instance will have its __errors__ property object populated with the error messages for all failing fields. The methods and properties on the __errors__ property object are:

#### .first(refName)

returns the first error message for a field, false otherwise

#### .get(refName)

returns an array of error messages for a field, or an empty array if there are no errors

#### .all()

returns an object containing all error messages for all failing fields

#### .has(refName)

returns true if error messages exist for a field, false otherwise

#### .errorCount

the number of validation errors

### Target refs

```html
<input type="text" ref="name" validate="required" value="" />
<input type="text" ref="email" validate="required|email" value="not an email address.com" />
```

```js
let validation = new Validator(this.refs, { target: ['name'] });

validation.fails(); // true
validation.passes(); // false

// Error messages
validation.errors.first('name'); // 'The name field is required.'
validation.errors.get('name'); // returns an array of all name error messages
validation.errors.first('email'); // false
validation.errors.get('email'); // []
```

### Except refs

```js
let validation = new Validator(this.refs, { except: ['name'] });
```

### Custom Attribute Names

To display a custom "friendly" attribute name in error messages, set `ref-label` or use `.setAttributeNames()`

```html
<input type="text" ref="name" validate="required" ref-label="custom_name" value="" />
```

```js
let validator = new Validator(this.refs);
if (validator.fails()) {
  validator.errors.first('name'); // "The custom_name field is required."
}
```
or
```html
<input type="text" ref="name" validate="required" value="" />
```

```js
let validator = new Validator(this.refs);
validator.setAttributeNames({ name: 'custom_name' });
if (validator.fails()) {
  validator.errors.first('name'); // "The custom_name field is required."
}
```

Alternatively you can supply global custom attribute names in your lang with the `attributes` property.

You can also configure a custom attribute formatter:

```js
// Configure global formatter.
Validator.setAttributeFormatter(function(attribute) {
  return attribute.replace(/_/g, ' ');
});

// Or configure formatter for particular instance.
let validator = new Validator(this.refs);
validator.setAttributeFormatter(function(attribute) {
  return attribute.replace(/_/g, ' ');
});
if (validator.fails()) {
  console.log(validator.errors.first('first_name')); // The first name field is required.
}
```

Note: by default all _ characters will be replaced with spaces.

### Custom message

To display a custom "friendly" error messages, set `custom-message`

```html
<input type="text" ref="year" pattern="/^(19|20)[\d]\{2,2\}$/" custom-message="The year format is 19xx or 20xx" value="" />
<input type="text" ref="year" pattern="/^(19|20)[\d]\{2,2\}$/" custom-message="regex:The year format is 19xx or 20xx" value="" />
<input type="text" ref="year" pattern="/^(19|20)[\d]\{2,2\}$/" custom-message='\{"required":"Required!", "regex":"The year format is 19xx or 20xx"\}' value="" />
<input type="text" ref="year" pattern="/^(19|20)[\d]\{2,2\}$/" custom-message="\{&quot;required&quot;:&quot;Required!&quot;, &quot;regex&quot;:&quot;The year format is 19xx or 20xx&quot;\}" value="" />
```

```js
let validator = new Validator(this.refs);
if (validator.fails()) {
  validator.errors.first('year'); // "The year format is 19xx or 20xx"
}
```

### Language Support

Error messages are in English by default. 

In Node, it will automatically pickup on the language source files.

```js
let Validator = require('validatorjs-riot');
Validator.useLang('ru');
```

If you don't see support for your language, please add one to `src/lang`!

You can also add your own custom language by calling `setMessages`:

```js
Validator.setMessages('lang_code', {
  required: 'The :attribute field is required.'
});
```

Get the raw object of messages for the given language:

```js
Validator.getMessages('lang_code');
```

Switch the default language used by the validator:

```js
Validator.useLang('lang_code');
```

Get the default language being used:

```js
Validator.getDefaultLang(); // returns e.g. 'en'
```

Override default messages for language:

```js
let messages = Validator.getMessages('en');
messages.required = 'Whoops, :attribute field is required.';
Validator.setMessages('en', messages);
```