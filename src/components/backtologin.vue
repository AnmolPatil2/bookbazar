<template>
  <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">


                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                            <h5 class="text-center">Login Please</h5>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>

                             <div class="form-group">
                                <button class="btn btn-primary" @click="login">Login</button>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            
                             <h5 class="text-center">Create New Account</h5>
                             
                            <div class="form-group">
                                <label for="name">Your name</label>
                                <input type="text" v-model="name" class="form-control" id="name" placeholder="Your nice name">
                            </div>
                            <h2>SignUp</h2>
                            +91<input type="number" v-model="phNo" placeholder="Phone Number"/>
                            <button id="sign-in-button" @click="initReCaptcha">Get OTP</button>
                            <div id="recaptcha-container"></div><br>
                            <input type="number" v-model="otp" placeholder="OTP"/>
                            <button @click="verifyOtp">Verify</button><br>
                            <button @click="initReCaptcha">Resend OTP</button>
                        </div>

                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary" @click="register">Signup</button>
                            </div>

                        </div>
                        </div>
                    
 
                </div>
           
            </div>
        </div>
        </div>
    
  </div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          email:null,
          password:null,
          phNo: null,
          appVerifier : null,
        otp : null
        
      }
  },
  methods:{
         sendOtp(){
        if(this.phNo.length = 10){
          alert('Invalid Phone Number Format !');
        }else{
          //
          let countryCode = '+91' //india
          let phoneNumber = countryCode + this.phNo
          //
          let appVerifier = this.appVerifier
          //
          fb.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              //
              alert('SMS sent')
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
            alert('Error ! SMS not sent')
          });
        }
      },
      //
      verifyOtp(){
        if(this.phNo.length != 10 || this.otp.length != 6){
          alert('Invalid Phone Number/OTP Format !');
        }else{
          //
          let vm = this
          let code = this.otp
          //
          window.confirmationResult.confirm(code).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            // ...
            //route to set password !
            vm.$router.push({path:'/setPassword'})
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
          });
        }
      },
      initReCaptcha(){
          fb.auth().languageCode = 'it';
          window.recaptchaVerifier = new fb.auth.RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});
          //
         
        
      },
    
    created(){
      this.initReCaptcha()
    },
  
      loginphone(){
        let vm = this
        let countryCode = '+91' //india
        let email = countryCode + this.phNo + '@domainName.com'
        let password = this.password
        //
        fb.auth().signInWithEmailAndPassword(email, password).then(function(){
          //route to home on success !
          vm.$router.push({path:'/home'})
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          let errMsg = error.message.toLowerCase()
          while(errMsg.indexOf('email') != -1){
            errMsg = errMsg.replace("email address", "phone number");
          }
          //
          alert('Error: ' + errMsg)
        });
      },
      
      login(){
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                        $('#login').modal('hide')
                          this.$router.replace('admin');  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });
      },
      register(){
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    $('#login').modal('hide')
                    
                    db.collection("profiles").doc(user.user.uid).set({
                        name: this.name
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                    this.$router.replace('admin');
                })
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
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
</style>
