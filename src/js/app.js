// Import controls.
import { MDCTabBar } from '@material/tab-bar';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter';

import { MDCSnackbar } from '@material/snackbar';

import anime from 'animejs/lib/anime.es.js';

// Init.
const TAB_BAR = new MDCTabBar(document.getElementsByClassName('mdc-tab-bar')[0]);

const CONTACT_FORM = document.getElementsByTagName('form')[0];

const SNACK_BAR = new MDCSnackbar(document.getElementsByClassName('mdc-snackbar')[0]);

const NAME_TEXT_FIELD = new MDCTextField(document.getElementById('ks-name-text-field'));
const EMAIL_TEXT_FIELD = new MDCTextField(document.getElementById('ks-email-text-field'));
const MESSAGE_TEXT_FIELD = new MDCTextField(document.getElementById('ks-message-text-field'));
const MESSAGE_TEXT_FIELD_CHARACTER_COUNTER = new MDCTextFieldCharacterCounter(document.getElementById('ks-message-text-field-character-counter'));
const EMAIL_VALIDATION_MSG = new MDCTextFieldHelperText(document.getElementById('ks-email-validation-msg'));

const PROJECT_DEMO_BUTTONS = document.getElementsByClassName('ks-project-demo-button');

const SEND_CONTACT_FORM_BUTTON = document.getElementById('ks-send-contact-form-button');
const SEND_CONTACT_FORM_BUTTON_LABLE = document.getElementById('ks-send-contact-form-button-label');

// About page animation.
function animateAboutPage() {
  anime({
    targets: ['.ks-about-content > .mdc-typography', '#ks-social-media-container'],
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    duration: 1000,
    delay: (_element, i) => { return i * 150 },
    easing: 'easeInOutQuad'
  });
}

// Card animation.
function animateProjectsCards() {
  anime({
    targets: '.ks-card',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    duration: 1000,
    delay: (_element, i) => { return i * 150 },
    easing: 'easeInOutQuad'
  });
}

function animateContactForm() {
  anime({
    targets: 'form',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    duration: 1000,
    easing: 'easeInOutQuad'
  });
}

// Tab toggle control.
TAB_BAR.listen('MDCTab:interacted', (event) => {
  if (event.detail.tabId === 'mdc-tab-1') {
    document.getElementsByClassName('ks-section-content')[0].classList.remove('ks-hide');
    document.getElementsByClassName('ks-section-content')[1].classList.add('ks-hide');

    // Show card animation.
    for (const CARDS of document.getElementsByClassName('ks-card')) {
      CARDS.style.opacity = 0;
    }
    animateProjectsCards();
  }
  if (event.detail.tabId === 'mdc-tab-2') {
    document.getElementsByClassName('ks-section-content')[0].classList.add('ks-hide');
    document.getElementsByClassName('ks-section-content')[1].classList.remove('ks-hide');

    // Show form animation.
    document.getElementsByTagName('form')[0].style.opacity = 0;
    animateContactForm();
  }
});

// Form button control.
CONTACT_FORM.addEventListener('input', (_event) => {
  if (NAME_TEXT_FIELD.valid && EMAIL_TEXT_FIELD.valid && MESSAGE_TEXT_FIELD.valid) {
    SEND_CONTACT_FORM_BUTTON.removeAttribute('disabled', '');
  } else {
    SEND_CONTACT_FORM_BUTTON.setAttribute('disabled', '');
  }
});

// Form eamil field validation.
EMAIL_TEXT_FIELD.listen('input', (_event) => {
  if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EMAIL_TEXT_FIELD.value)) && EMAIL_TEXT_FIELD.value !== '') {
    EMAIL_TEXT_FIELD.getDefaultFoundation().setValid(false);
    EMAIL_VALIDATION_MSG.getDefaultFoundation().setContent('The email is badly formated.');
  } else if (EMAIL_TEXT_FIELD.value === '') {
    EMAIL_VALIDATION_MSG.getDefaultFoundation().setContent('This field is required.');
  } else {
    EMAIL_TEXT_FIELD.getDefaultFoundation().setValid(true);
  }
});

for (const PROJECT_DEMO_BUTTON of PROJECT_DEMO_BUTTONS) {
  PROJECT_DEMO_BUTTON.addEventListener('click', (_event) => {
    window.location = PROJECT_DEMO_BUTTON.dataset.projectdemolink;
  });
}

// Submit control.
SEND_CONTACT_FORM_BUTTON.addEventListener('click', async (event) => {
  event.preventDefault();
  SEND_CONTACT_FORM_BUTTON.setAttribute('disabled', '');
  SEND_CONTACT_FORM_BUTTON_LABLE.textContent = 'Sending';

  if (NAME_TEXT_FIELD.valid && EMAIL_TEXT_FIELD.valid && MESSAGE_TEXT_FIELD.valid) {
    let sendContactFormResponse;
    try {
      sendContactFormResponse = await fetch(new Request('https://kynsonszetau.com/api/sendcontactform/'), {
         body: JSON.stringify({
           name: NAME_TEXT_FIELD.value,
           email: EMAIL_TEXT_FIELD.value,
           message: MESSAGE_TEXT_FIELD.value
         }),
         headers: {
           'Content-Type': 'application/json'
         },
         method: 'POST',
         mode: 'cors'
      });
    } catch (_error) {
      SNACK_BAR.labelText = 'En error has occoured, please try again.';
      SNACK_BAR.open();

      SEND_CONTACT_FORM_BUTTON_LABLE.textContent = 'Send';
      SEND_CONTACT_FORM_BUTTON.removeAttribute('disabled', '');
      return;
    }

    if (sendContactFormResponse.ok) {
      SNACK_BAR.labelText = 'Your message has been sent.';

      MESSAGE_TEXT_FIELD_CHARACTER_COUNTER.getDefaultFoundation().setCounterValue(0, 500);
      CONTACT_FORM.reset();
    } else if (sendContactFormResponse.status === 429) {
      SNACK_BAR.labelText = 'Too many request, please try again in 12 hours.';

      SEND_CONTACT_FORM_BUTTON.removeAttribute('disabled', '');
    } else {
      SNACK_BAR.labelText = 'En error has occoured, please try again.';

      SEND_CONTACT_FORM_BUTTON.removeAttribute('disabled', '');
    }

    SEND_CONTACT_FORM_BUTTON_LABLE.textContent = 'Send';

    SNACK_BAR.open();
  } else {
    SNACK_BAR.labelText = 'Please fill in all fields.';
    SEND_CONTACT_FORM_BUTTON_LABLE.textContent = 'Send';
    SNACK_BAR.open();
  }
});

animateAboutPage();
animateProjectsCards();
