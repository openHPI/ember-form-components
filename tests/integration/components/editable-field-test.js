import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';


moduleForComponent('editable-field', 'Integration | Component | editable field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // We can pass text to show when editing
  this.render(hbs`
    {{#editable-field}}
      show when editing
    {{/editable-field}}
  `);

  assert.ok(!this.$().text().includes('show when editing'));

  // After clicking on the placeholder, we should see our passed text
  this.$().find('a').click();
  assert.ok(this.$().text().includes('show when editing'));
});

test('clicking outside cancels editing', function(assert) {
  assert.expect(2);

  this.render(hbs`
    <p id="cancel">Click me</p>
    {{#editable-field}}
      editing
    {{/editable-field}}
  `);

  Ember.run(() => this.$().find('a').click());
  assert.ok(this.$().text().includes('editing'));

  // After clicking somewhere on the document body, we should return to normal mode
  Ember.run(() => this.$().find('#cancel').click());
  assert.ok(!this.$().text().includes('editing'));
});

test('pressing enter on a form element submits the form', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#editable-field isEditing=true}}
      {{input id='field'}}
      <p id="content">editing</p>
    {{/editable-field}}
  `);

  // After pressing the "Enter" key in the input field, we should save
  Ember.run(() => this.$('#field').trigger($.Event('submit')));
  assert.ok(!this.$().text().includes('editing'));
});

test('pressing escape cancels editing', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#editable-field isEditing=true}}
      <p id="content">editing</p>
    {{/editable-field}}
  `);

  // After pressing the "ESC" key on the keyboard, we should return to normal mode
  Ember.run(() => this.$('#content').trigger($.Event('keyup', { keyCode: 27 })));
  assert.ok(!this.$().text().includes('editing'));
});
