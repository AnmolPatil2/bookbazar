<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="width:00px ">
        <div class="modal-content">
          <div class="modal-body">
            <article>
              <div class="form-collection">
                <div class="card elevation-3 limit-width log-in-card below turned">
                  <div class="card-body">
                    <div class="input-group email">
                      <input type="text" v-model="email" placeholder="Email" />
                    </div>
                    <div class="input-group password">
                      <input type="password" v-model="password" placeholder="Password" />
                    </div>
                    <div class="btn white darken-4 col s10 m4" id="extra">
                      <v-btn id="extra" @click=" signInWithGoogle()" style="text-transform:none">
                        <div class="left">
                          <img
                            id="extra"
                            width="20px"
                            alt="Google  Logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                          />
                        </div>Login with Google
                      </v-btn>
                      <v-btn @click="changerouter()" class="zocial call icon">phone auth</v-btn>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" @click="login()" class="login-btn">Log in</button>
                  </div>
                </div>

                <div class="card elevation-2 limit-width sign-up-card above">
                  <div class="card-body">
                    <div class="input-group fullname">
                      <input type="text" v-model="name" placeholder="Full Name" />
                    </div>
                    <div class="input-group email">
                      <input type="email" v-model="email" placeholder="Email" />
                    </div>
                    <div class="input-group password">
                      <input type="password" v-model="password" placeholder="Password" />
                    </div>
                    <p class="red--text">{{feedback}}</p>
                  </div>
                  <div class="card-footer">
                    <button type="submit" @click="register()" class="signup-btn">Sign Up</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import slugify from "slugify";
import Popup from "./Popup";
import * as mykey from "./login.js";
import firebase1 from "@firebase/app";
export default {
  name: "Login",

  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,

      feedback: null,
      slug: null
    };
  },
  methods: {
    changerouter() {
      $("#login").modal("hide");
      this.$router.replace("signup");
    },
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
    signInWithGoogle() {
      const provider = new firebase1.auth.GoogleAuthProvider();

      firebase1.auth().signInWithPopup(provider);
    },
    register() {
      if (this.name) {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[!@#$%^&*()]/g,
          lower: true
        });
        let ref = db.collection("profiles").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This name is already taken";
          } else {
            fb.auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  name: this.name,

                  user_id: cred.user.uid
                });
              })
              .then(() => {
                var user = firebase1.auth().currentUser;

                user
                  .sendEmailVerification()
                  .then(() => {})
                  .catch(error => {
                    // An error happened.
                  });
                $("#login").modal("hide");
                this.$router.push({ name: "accounts" });
              })
              .catch(error => {
                // Handle Errors here.
                this.feedback = null;
                this.feedback = error.message;
                // ...
              });
          }
        });
      } else {
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-content {
  margin: 0;
  height: 100%;
}

.form-collection {
  width: 350px;
  height: 350px;
}
@media only screen and (max-width: 600px) {
  .limit-width {
    width: 250px;
    margin-left: 5px;
  }
  .card-body {
    padding: 5px;
  }

  .modal-body {
    margin: 0;
    padding: 0;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: left;
    -webkit-align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: left;
    background: #2196f3;
  }
  #extra {
    margin: 0;
    padding: 0;
  }
  .input-group {
    border: 2px solid #eee;
    position: relative;
    background: #eee;
    margin: 1px 0;
    border-radius: 2px;
    overflow: hidden;
    padding: 10px;
  }
}
@media only screen and (min-width: 600px) {
  .limit-width {
    width: 300px;
  }
  .card-body {
    padding: 20px;
  }

  .modal-body {
    margin: 0;
    padding: 0;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: #2196f3;
  }
  .input-group {
    border: 2px solid #eee;
    position: relative;
    background: #eee;
    margin: 25px 0;
    border-radius: 2px;
    overflow: hidden;
    padding: 10px;
  }
}

.absolute-footer {
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 1;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 27.2px;
  font-size: 1.7rem;
  font-weight: 300;
  padding: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}

.form-collection {
  z-index: 2;
}

/*Styling Card */
.card {
  font-family: "Open Sans", sans-serif;
  background: #fff;
  position: absolute;
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
}

.box-btn {
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  display: block;
  padding: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #444;
  background: rgba(0, 0, 0, 0);
  -webkit-transition: 0.2s ease all;
  transition: 0.2s ease all;
  border-radius: 3px;
}

.box-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.box-btn:active {
  background: rgba(0, 0, 0, 0.1);
}

.input-group input {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.input-group label {
  position: absolute;
  top: 10px;
  left: 0;
  padding-left: 10px;
  font-weight: 500;
  color: #aaa;
}

.card-footer button {
  width: 100%;
  padding: 25px;
  font-size: 24px;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
  background: #4caf50;
  border: none;
  color: #fff;
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

/*Animation Classes And Prerequisits */
.above {
  z-index: 1;
}

.below {
  z-index: 0;
}

.turned {
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
}

.sign-up-card,
.log-in-card {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.sign-up-card.turned {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.8" /></filter></svg>#filter');
  -webkit-filter: blur(0.8px);
  filter: blur(0.8px);
  webkit-filter: blur(0.8px);
  -webkit-transform: rotateZ(-90deg) translate3d(0, 100px, 0) scale(0.7);
  transform: rotateZ(-90deg) translate3d(0, 100px, 0) scale(0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.log-in-card.turned {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="1" /></filter></svg>#filter');
  -webkit-filter: blur(1px);
  filter: blur(1px);
  webkit-filter: blur(1px);
  -webkit-transform: rotateZ(-90deg) translateX(0px) translateY(100px)
    scale(0.7);
  transform: rotateZ(-90deg) translateX(0px) translateY(100px) scale(0.7);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.animation-state-1 .sign-up-card.below {
  -webkit-transform: rotateZ(-7deg) translateY(150px) scale(0.78);
  transform: rotateZ(-7deg) translateY(150px) scale(0.78);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.4" /></filter></svg>#filter');
  -webkit-filter: blur(0.4px);
  filter: blur(0.4px);
  webkit-filter: blur(0.4px);
}

.animation-state-1 .log-in-card.above {
  -webkit-transform: rotateZ(-83deg) translateY(-180px) translateX(100px)
    scale(0.78);
  transform: rotateZ(-83deg) translateY(-180px) translateX(100px) scale(0.78);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.5" /></filter></svg>#filter');
  -webkit-filter: blur(0.5px);
  filter: blur(0.5px);
  webkit-filter: blur(0.5px);
}

.animation-state-finish .sign-up-card.above {
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotateZ(5deg) translateY(0px) scale(1);
  transform: rotateZ(5deg) translateY(0px) scale(1);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0" /></filter></svg>#filter');
  -webkit-filter: blur(0);
  filter: blur(0);
  webkit-filter: blur(0);
}

.animation-state-finish .log-in-card.below {
  -webkit-transform: rotateZ(-90deg) translateX(0px) translateY(100px)
    scale(0.7);
  transform: rotateZ(-90deg) translateX(0px) translateY(100px) scale(0.7);
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="1" /></filter></svg>#filter');
  -webkit-filter: blur(1px);
  filter: blur(1px);
  webkit-filter: blur(1px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.animation-state-1 .log-in-card.below {
  -webkit-transform: rotateZ(-10deg) translateY(180px) scale(0.78);
  transform: rotateZ(-10deg) translateY(180px) scale(0.78);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.5" /></filter></svg>#filter');
  -webkit-filter: blur(0.5px);
  filter: blur(0.5px);
  webkit-filter: blur(0.5px);
}

.animation-state-1 .sign-up-card.above {
  -webkit-transform: rotateZ(-80deg) translateY(-170px) translateX(100px)
    scale(0.78);
  transform: rotateZ(-80deg) translateY(-170px) translateX(100px) scale(0.78);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.4" /></filter></svg>#filter');
  -webkit-filter: blur(0.4px);
  filter: blur(0.4px);
  webkit-filter: blur(0.4px);
}

.animation-state-finish .log-in-card.above {
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotateZ(5deg) translateY(0px) scale(1);
  transform: rotateZ(5deg) translateY(0px) scale(1);
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0" /></filter></svg>#filter');
  -webkit-filter: blur(0);
  filter: blur(0);
  webkit-filter: blur(0);
}

.animation-state-finish .sign-up-card.below {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="0.4" /></filter></svg>#filter');
  -webkit-filter: blur(0.4px);
  filter: blur(0.4px);
  webkit-filter: blur(0.4px);
  -webkit-transform: rotateZ(-90deg) translate3d(0, 100px, 0) scale(0.7);
  transform: rotateZ(-90deg) translate3d(0, 100px, 0) scale(0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  opacity: 0.7;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
}
</style>
