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
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="width:100%;">
        <div class="modal-content">
          <div class="modal-body">
            <article>
              <div class="form-collection">
                <div class="card elevation-3 limit-width log-in-card below turned">
                  <div class="card-body">
                    <div class="input-group email">
                      <input type="text" placeholder="Email">
                    </div>
                    <div class="input-group password">
                      <input type="password" placeholder="Password">
                    </div>
                    <a href="#" class="box-btn">Forgot Password?</a>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="login-btn">Log in</button>
                  </div>
                </div>

                <div class="card elevation-2 limit-width sign-up-card above">
                  <div class="card-body">
                    <div class="input-group fullname">
                      <input type="text" placeholder="Full Name">
                    </div>
                    <div class="input-group email">
                      <input type="email" placeholder="Email">
                    </div>
                    <div class="input-group password">
                      <input type="password" placeholder="Password">
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="signup-btn">Sign Up</button>
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
      signUp: false
    };
  },
  methods: {
    login() {
      alert("Wrong password.");
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#login").modal("hide");
          this.$router.replace("admin");
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
    },
    signInWithGoogle() {
      const provider = new firebase1.auth.GoogleAuthProvider();

      firebase1.auth().signInWithPopup(provider);
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          $("#login").modal("hide");

          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
}

article {
  font-family: Tahoma;
  font-size: 1.2rem;
  color: #222;
  background-color: #092525;
  height: 60vh;
  width: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  position: relative;
  width: 900px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
    z-index: 100;
  }

  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, #7fd625, #009345);
    color: #fff;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }

  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc(50% - 80px);
    height: calc(100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform 0.5s ease-in-out;
  }

  .overlay-left {
    @include overlays(-20%);
  }

  .overlay-right {
    @include overlays(0);
    right: 0;
  }
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: #222;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid #009345;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px 40px;
  width: calc(50%);
  height: calc(100%);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all 0.5s ease-in-out;

  div {
    font-size: 1rem;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: calc(100% - 30px);
    border-radius: 15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  padding-right: 30px;
  z-index: 1;
  opacity: 0;
}

.sign-up-active {
  .sign-in {
    transform: translateX(100%);
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.5s;
  }

  .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    transform: translateX(50%);
  }

  .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    transform: translateX(20%);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}
</style>
