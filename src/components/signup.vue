<template>
  <div class="phoneauth">
    <div id="recaptcha-container"></div>

    <div id="wrapper" class="auth1">
      <div id="dialog">
        <div v-if="otpsent">
          <button class="close">×</button>
          <h2>
            SignUp Using Phone
            Number
          </h2>
          <span>(make sure its you whats app number)</span>
          <br />
          <br />+91
          <input type="number" v-model="phNo" placeholder="Phone Number" />
          <div id="form">
            <button class="btn btn-primary btn-embossed" id @click="sendOtp">Get OTP</button>
          </div>
        </div>
        <div v-if="otpsent===false">
          <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
          <span>(we want to make sure it's you before we contact our movers)</span>
          <div id="form" class="input1">
            <input
              class="input1"
              type="text"
              v-model="number1"
              maxlength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
            />
            <input
              class="input1"
              type="text"
              v-model="number2"
              maxlength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
            />
            <input
              class="input1"
              type="text"
              maxlength="1"
              v-model="number3"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
            />
            <input
              class="input1"
              type="text"
              maxlength="1"
              v-model="number4"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
            />
            <input
              class="input1"
              type="text"
              maxlength="1"
              size="1"
              v-model="number5"
              min="0"
              max="9"
              pattern="[0-9]{1}"
            />
            <input
              class="input1"
              type="text"
              maxlength="1"
              size="1"
              min="0"
              v-model="number6"
              max="9"
              pattern="[0-9]{1}"
            />
            <button @click="verifyOtp()" class="btn btn-primary btn-embossed">Verify</button>
          </div>

          <div>
            Didn't receive the code?
            <br />
            <a href="#" @click="otpsent=true">Send code again</a>
            <span id="timer"></span>
            <br />
            <a href="#" @click="otpsent=true">Change phone number</a>
          </div>
          <img
            src="http://jira.moovooz.com/secure/attachment/10424/VmVyaWZpY2F0aW9uLnN2Zw=="
            alt="test"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase1 from "@firebase/app";
export default {
  name: "signup",
  data() {
    return {
      phNo: "",
      timerOn: true,
      appVerifier: "",
      otp: "",
      otpsent: true,
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      number5: "",
      number6: ""
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

        firebase1
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            alert("SMS sent");
          })
          .catch(function(error) {
            // Error; SMS not sent
            // ...
          });
        this.otpsent = false;
      }
    },
    //
    verifyOtp() {
      this.otp =
        this.number1 +
        this.number2 +
        this.number3 +
        this.number4 +
        this.number5 +
        this.number6;

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

            vm.$router.push({
              name: "profile1"
            });
            // Update successful.
          })
          .catch(function(error) {
            // User couldn't sign in (bad verification code?)
            // ...
            alert("Invalid OTP Submitted");
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
              alert("failed");
            }
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 10000);
    }
  },
  beforeMount() {},
  mounted() {
    function timer(remaining) {
      var m = Math.floor(remaining / 60);
      var s = remaining % 60;

      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      document.getElementById("timer").innerHTML = m + ":" + s;
      remaining -= 1;

      if (remaining >= 0 && timerOn) {
        setTimeout(function() {
          timer(remaining);
        }, 1000);
        return;
      }

      if (!timerOn) {
        // Do validate stuff here
        return;
      }

      // Do timeout stuff here
      alert("Timeout for otp");
    }
    $(function() {
      "use strict";

      var body = $(".auth1");

      function goToNextInput(e) {
        var key = e.which,
          t = $(e.target),
          sib = t.next(".input1");

        if (key != 9 && (key < 48 || key > 57)) {
          e.preventDefault();
          return false;
        }

        if (key === 9) {
          return true;
        }

        if (!sib || !sib.length) {
          sib = body.find("input1").eq(0);
        }
        sib.select().focus();
      }

      function onKeyDown(e) {
        var key = e.which;

        if (key === 9 || (key >= 48 && key <= 57)) {
          return true;
        }

        e.preventDefault();
        return false;
      }

      function onFocus(e) {
        $(e.target).select();
      }

      body.on("keyup", ".input1", goToNextInput);
      body.on("keydown", ".input1", onKeyDown);
      body.on("click", ".input1", onFocus);
    });
  },
  created() {
    this.initReCaptcha();
  }
};
</script>

<style scoped>
.phoneauth {
  height: 100vh;
  background: #ddccdd;
}
#wrapper {
  font-family: Lato;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: #333;
}
#wrapper #dialog {
  border: solid 1px #ccc;
  margin: 10px auto;
  padding: 20px 30px;
  display: inline-block;
  box-shadow: 0 0 4px #ccc;
  background-color: #faf8f8;
  overflow: hidden;
  position: relative;
  max-width: 450px;
}
#wrapper #dialog h3 {
  margin: 0 0 10px;
  padding: 0;
  line-height: 1.25;
}
#wrapper #dialog span {
  font-size: 90%;
}
#wrapper #dialog #form {
  max-width: 240px;
  margin: 25px auto 0;
}
#wrapper #dialog #form input {
  margin: 0 5px;
  text-align: center;
  line-height: 80px;
  font-size: 50px;
  border: solid 1px #ccc;
  box-shadow: 0 0 5px #ccc inset;
  outline: none;
  width: 20%;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
}
#wrapper #dialog #form input:focus {
  border-color: purple;
  box-shadow: 0 0 5px purple inset;
}
#wrapper #dialog #form input::-moz-selection {
  background: transparent;
}
#wrapper #dialog #form input::selection {
  background: transparent;
}
#wrapper #dialog #form button {
  margin: 30px 0 50px;
  width: 100%;
  padding: 6px;
  background-color: #b85fc6;
  border: none;
  text-transform: uppercase;
}
#wrapper #dialog button.close {
  border: solid 2px;
  border-radius: 30px;
  line-height: 19px;
  font-size: 120%;
  width: 22px;

  right: 5px;
  top: 5px;
}
#wrapper #dialog div {
  position: relative;
  z-index: 1;
}
#wrapper #dialog img {
  position: absolute;
  bottom: -70px;
  right: -63px;
}
</style>
