# ember-form-components

Ember Form Components is a collection of Ember components useful for developing interactive HTML forms.

It was developed for the needs of [openHPI](https://open.hpi.de), the online learning platform of the Hasso Plattner Institute (HPI).

## Installation

To install the addon, run the following command in your Ember project:

* `npm install --save-dev ember-form-components`

## Usage

The addon features several easy-to-use Ember components.

### {{editable-field}}

This component can be used as a replacement for the awesome [x-editable plugin](http://vitalets.github.io/x-editable/). It allows you to make text editable by clicking on it.

~~~hbs
{{#editable-field as |save cancel|}}
  {{input value=value enter=save}}
{{/editable-field}}
~~~

## Contributing

To install this package and its dependencies, run the following commands:

* `git clone` this repository
* `npm install`
* `bower install`

To see a demo of the addon:

* `ember server`
* Visit your app at http://localhost:4200.

Run tests using these commands:

* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
