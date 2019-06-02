<template>
  <div>
    <h2>SignUp</h2>+91
    <input type="number" v-model="phNo" placeholder="Phone Number">
    <button id="sign-in-button" @click="recap()">Get OTP</button>
    <div id="recaptcha-container"></div>
    <br>
    <input type="number" v-model="otp" placeholder="OTP">
    <button @click="verifyOtp">Verify</button>
    <br>
    <button @click="sendOtp()">Resend OTP</button>
  </div>
</template>

<script>
import { fb } from "../firebase";

export default {
  data() {
    return {
      phNo: "",
      appVerifier: "",
      otp: ""
    };
  },
  methods: {
    recap() {
      window.recaptchaVerifier = new fb.auth().RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            sendOtp();
            alert("SMS sent");
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        }
      );
      recaptchaVerifier.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
      });
    },

    sendOtp() {
      alert("SMS sent");
      //
      let countryCode = "+91"; //india
      let phoneNumber = countryCode + this.phNo;
      //
      var appVerifier = window.recaptchaVerifier;
      //
      fb.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          //
          alert("SMS sent");
        })
        .catch(error => {
          // Error; SMS not sent
          // ...
          alert("Error ! SMS not sent");
        });
    },
    //
    verifyOtp() {},
    initReCaptcha() {}
  },
  created() {}
};
</script>