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

test('clicking on the body cancels editing', function(assert) {
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
