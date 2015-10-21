import Ember from 'ember';
import layout from '../templates/components/editable-field';

export default Ember.Component.extend({
  layout: layout,

  tagName: 'span',

  isEditing: false,
  original: '',
  placeholder: '',

  clickableValue: Ember.computed('value', 'placeholder', function() {
    return this.get('value') || this.get('placeholder');
  }),

  actions: {
    edit() {
      this.set('original', this.get('value'));
      this.set('isEditing', true);
    },
    cancel() {
      this.set('isEditing', false);
      this.set('value', this.get('original'));
    },
    save() {
      this.set('isEditing', false);
      if (this.get('onsave')) {
        this.get('onsave')();
      }
    }
  }
});
