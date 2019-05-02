<template>
  <div>
    <!-- Number Input Form -->
    <div v-if="showNumberInput">
      <form v-on:submit.prevent>
        <div class="form-group">
          <input type="text" class="form-control form-control-lg" v-model="numberInputForm.number" placeholder="Phone number" required>
        </div>
        <div class="form-group">
          <button type="submit" id="get-sign-in-code" class="btn btn-block btn-lg success theme-accent">{{ getSignInCodeButton.text }}</button>
        </div>
      </form>
    </div>

    <!-- SMS Verification Form -->
    <div v-if="showCodeInput">
      <form>
        <div class="form-group">
          <input type="text" class="form-control form-control-lg" value="9944" placeholder="Verification Code" required>
        </div>
        <div class="form-group">
          <a href="javascript:void" class="btn btn-block btn-lg success theme-accent" @click="signIn">{{ signInButton.text }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {fb,db} from '../firebase'

export default {
  name: 'SignIn',

  data() {
    return {
      // UI States
      showNumberInput: true,
      showCodeInput: false,

      // Forms
      numberInputForm: {
        number: '',
      },

      // Buttons
      getSignInCodeButton: {
        text: 'Get sign in code',
      },
      signInButton: {
        text: 'Sign in',
      },
    };
  },

  mounted() {
  const self = this;

  // Start Firebase invisible reCAPTCHA verifier
  window.recaptchaVerifier = new fb.auth.RecaptchaVerifier('get-sign-in-code', {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      self.sendSMS();
    },
  });

  window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
},

  methods: {
    /**
     * Sends the user an SMS-verification code using Firebase auth
     *
     * @see https://firebase.google.com/docs/auth/web/phone-auth
     */
    sendSMS() {
      const self = this;

      self.getSignInCodeButton = {
        showSpinner: true,
        text: 'Sending SMS..',
        disabled: true,
      };
    },


    /**
     * Authenticates the user with Firebase auth
     */
    signIn() {
      // Redirect the user to the authenticated page
    },
  },
};
</script>