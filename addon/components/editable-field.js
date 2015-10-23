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
      this.cancel();
    },
    save() {
      this.set('isEditing', false);
      if (this.get('onsave')) {
        this.get('onsave')();
      }
    }
  },

  cancel() {
    this.set('isEditing', false);
    this.set('value', this.get('original'));
  },

  /*
   * AUTOFOCUS
   * Every time we enter editing mode, we try to focus the first focusable element we find.
   */

  autofocus: Ember.observer('isEditing', function() {
    if (this.get('isEditing')) {
      Ember.run.scheduleOnce('afterRender', () => this.$('input:not([disabled]),select:not([disabled]),textarea:not(disabled)').first().focus() );
    }
  }),

  /*
   * CANCEL WHEN CLICKING OUTSIDE
   * If we're in editing mode, a click on the outside (somewhere on the document)
   * will cancel editing.
   */

  boundClickHandler: Ember.computed(function() {
    return this.get('clickHandler').bind(this);
  }),

  clickHandler(e) {
    // Only need to cancel if we're in editing mode
    if (!this.get('isEditing')) { return; }

    var element = this.get('element');
    var $target = Ember.$(e.target);
    var thisIsElement = $target.closest(element).length === 1;

    // If the user clicked on the placeholder for editing, isEditing will already
    // be true. However, the edit button will already be removed from the DOM, thus
    // thisIsElement will be false. We therefore have to return early in this case.
    if ($target.hasClass('internal--edit-button')) { return; }

    // If we're not clicking on the element itself, cancel editing mode
    if (!thisIsElement) {
      this.set('isEditing', false);
    }
  },

  didInsertElement() {
    Ember.$(document).on('click', this.get('boundClickHandler'));
  },

  willDestroyElement() {
    Ember.$(document).off('click', this.get('boundClickHandler'));
  }
});
