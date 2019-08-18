<template>
  <div class="phoneauth">
    <div id="recaptcha-container"></div>

    <div id="wrapper" class="auth1">
      <div id="dialog">
        <div v-if="otpsent">
          <button @click="back()" class="close">×</button>
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
            <p class="red--text">{{this.feedback}}</p>
          </div>
        </div>
        <div v-if="otpsent===false ">
          <div>
            <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
            <span
              class="red--text"
              v-if="!sent"
            >(randomly move your mouse or your screen to get otp)</span>
            <span class="red--text" v-if="sent">(check your phone to see otp)</span>
            <div id="form" class="input1" v-if="!isphone">
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

            <div class="m-4" v-if="isphone">
              <input type="number" placeholder="Enter Otp Here" />
            </div>
          </div>
          <div>
            Didn't receive the code?
            <br />
            <a href="#" @click="otpsent=true">Send code again</a>
            <span id="timer"></span>
            <br />
            <a href="#" @click="otpsent=true">Change phone number</a>
            <br />
            <a href="#" @click="otpsent=true">Unable to get OTP ?</a>
          </div>
          <img
            src="http://jira.moovooz.com/secure/attachment/10424/VmVyaWZpY2F0aW9uLnN2Zw=="
            alt="test"
          />
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import firebase1 from "@firebase/app";
export default {
  name: "signup",
  data() {
    return {
      isphone: null,
      feedback: null,
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
      number6: "",
      sent: false
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
            this.sent = true;
            alert("SMS sent");
          })
          .catch(function(error) {
            console.log(error);
            this.feedback = "click again";
            alert(this.feedback);
            console.log("click again");
          });

        this.otpsent = false;
      }
      if (this.otpsent) {
      }
    },
    back() {
      this.$router.go(-1);
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

            let ref = db.collection("profiles");
            ref.get().then(doc => {
              console.log(this.phNo);
            });
            vm.$router.push({
              name: "profile1"
            });
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
  beforeMount() {
    var check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    this.isphone = check;
  },
  mounted() {
    $(function() {
      console.log(this.isphone);
      ("use strict");

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
  background: #2e9cca;
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
  border-color: #123c69;
  box-shadow: 0 0 5px #123c69;
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
  background-color: #123c69;
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
