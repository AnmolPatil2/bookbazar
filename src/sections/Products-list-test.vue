<template>
  <div>
    <h2>SignUp</h2>+91
    <input type="number" v-model="phNo" placeholder="Phone Number">
    <button id="sign-in-button" @click="sendOtp">Get OTP</button>
    <div id="recaptcha-container"></div>
    <br>
    <input type="number" v-model="otp" placeholder="OTP">
    <button @click="verifyOtp">Verify</button>
    <br>
    <button @click="sendOtp()">Resend OTP</button>
  </div>
</template>

<script>
import {fb} from "../firebase";
export default {
  data() {
    return {
      phNo: "",
      appVerifier: "",
      otp: ""
    };
  },
  methods: {
    sendOtp() {
      if (this.phNo.length != 10) {
        alert("Invalid Phone Number Format !");
      } else {
        fb.auth().settings.appVerificationDisabledForTesting = true;
        //
        let countryCode = "+91"; //india
        let phoneNumber = countryCode + this.phNo;
        //
        var appVerifier = new fb.auth.RecaptchaVerifier('recaptcha-container');
        //
        fb.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            alert("SMS sent");
          })
          .catch(function(error) {
            // Error; SMS not sent
            // ...
            alert("Error ! SMS not sent");
          });
      }
    },
    //
    verifyOtp() {
      
    },
    initReCaptcha() {
      
    }
  },
  created() {
    this.initReCaptcha();
  }
};
</script>