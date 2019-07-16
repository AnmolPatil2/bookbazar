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
import firebase1 from "@firebase/app";
export default {
  name: "signup",
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
        //
        let countryCode = "+91"; //india
        let phoneNumber = countryCode + this.phNo;
        //
        let appVerifier = this.appVerifier;
        console.log("ho");
        firebase1
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            alert("SMS sent");
            console.log("sss");
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
      if (this.phNo.length != 10 || this.otp.length != 6) {
        alert("Invalid Phone Number/OTP Format !");
      } else {
        //
        let vm = this;
        let code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then(function(result) {
            // User signed in successfully.
            var user = result.user;
            // ...
            //route to set password !
            vm.$router.push({ name: "accounts" });
          })
          .catch(function(error) {
            // User couldn't sign in (bad verification code?)
            // ...
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        let vm = this;
        window.recaptchaVerifier = new firebase1.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    }
  },
  created() {
    this.initReCaptcha();
  }
};
</script>