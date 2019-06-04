<template>
  <div>
    <h2>SignUp</h2>+91
    <input type="number" v-model="phNo" placeholder="Phone Number">
    <button id="sign-in-button" @click="sendOtp()">Get OTP</button>
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
import firebase1 from "@firebase/app";

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
      window.recaptchaVerifier = new firebase1.auth.RecaptchaVerifier(
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
      firebase1.auth().settings.appVerificationDisabledForTesting = true;
      let countryCode = "+91"; //india
      var testVerificationCode = "123456";
      let phoneNumber = "7996573530";
      //
      var appVerifier = new firebase1.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      //

      firebase1
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          return confirmationResult.confirm(testVerificationCode);
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