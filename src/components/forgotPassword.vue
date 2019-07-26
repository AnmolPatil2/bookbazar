<template>
  <div class="phoneauth">
    <div id="recaptcha-container"></div>

    <div id="wrapper" class="auth1">
      <div id="dialog">
        <div v-if="!sent">
          <button class="close">×</button>
          <h2>Password Recovery</h2>
          <span>(Are you sure your Email was verified)</span>
          <br />
          <br />
          <input type="email" v-model="email" placeholder="Email" />
          <div id="form">
            <button class="btn btn-primary btn-embossed" id @click="Emailsent()">Send Email</button>
          </div>
        </div>

        <div v-if="sent">
          <h2>Login to get going</h2>
          <span>(use the new Password that you reset thought email)</span>
          <br />
          <br />
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="password" />
          <div id="form">
            <button class="btn btn-primary btn-embossed" id @click="login()">Rejoin Community</button>
          </div>
          <div>
            Didn't receive any Email?
            <br />
            <a href="#" @click="otpsent=true">Send Email again</a>
            <span id="timer"></span>
            <br />
            <a href="#" @click="otpsent=true">Change Email</a>
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
import { fb, db } from "../firebase";
export default {
  name: "signup",
  data() {
    return {
      email: null,
      password: null,
      sent: false
    };
  },
  methods: {
    login() {
      if (this.email != null) {
        fb.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            $("#login").modal("hide");
            if (
              this.email == "nikimiki007@admin.com" ||
              this.email == "kruthikajos007@admin.com"
            ) {
              this.$router.replace("admin");
            } else {
              this.$router.replace("accounts");
            }
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
              alert("Wrong password.");
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
      }
    },
    Emailsent() {
      if (this.email != null) {
        const auth = firebase1.auth();
        auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            Toast.fire({
              type: "success",
              title: "Email sent"
            });
            this.sent = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
.phoneauth {
  max-height: 500px;
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
