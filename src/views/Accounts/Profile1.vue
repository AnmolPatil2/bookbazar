<template>
  <div class="products grey lighten-4">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Your Profile</h3>

            <p>Please complete your Profile</p>
          </div>
          <div class="col-md-5">
            <img src="/img/svg/profile.svg" width="300" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >Profile</a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
            >Account settings</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div
              class="alert alert-info"
            >Please Enter your Whatsapp Number,this will help us to contact you easly.</div>
            <div class="container">
              <div class="row">
                <div v-if="edit" class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>
                <div v-if="!edit" class="col-md-6">
                  <div class="form-group">
                    <h4>{{profile.name}}</h4>
                  </div>
                </div>

                <div v-if="edit" class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.phone"
                      placeholder="Phone"
                      class="form-control"
                    />
                  </div>
                </div>
                <div v-if="!edit" class="col-md-6">
                  <div class="form-group">
                    <h4>{{profile.phone}}</h4>
                  </div>
                </div>

                <div v-if="edit" class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.email"
                      placeholder="Email"
                      class="form-control"
                    />
                  </div>
                </div>
                <div v-if="!edit" class="col-md-6">
                  <div class="form-group">
                    <h4>{{profile.email}}</h4>
                  </div>
                </div>
                <v-btn v-if="this.reroute!=1" @click="confirmmail()">Confirm mail</v-btn>
                <div class="col-md-4">
                  <p class="red--text">{{this.feedback}}</p>
                  <div v-if="!edit" class="form-group">
                    <input
                      type="submit"
                      @click="changeedit()"
                      value="Edit"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>
                <div v-if="edit" class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-">
                  <div
                    class="alert alert-info"
                  >Please use the Reset password email button for reseting the password.</div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.name"
                      placeholder="User name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="account.email"
                      placeholder="Email address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="button"
                      @click="resetPassword"
                      value="Reset password email"
                      class="btn btn-success w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../../firebase";
import slugify from "slugify";
import firebase1 from "@firebase/app";

export default {
  name: "profile",
  components: {
    VueEditor,
    slugify
  },
  props: {
    msg: String
  },
  data() {
    return {
      feedback: null,
      reroute: null,
      edit: true,
      profile: {
        name: null,
        phone: null
      },
      user: [],
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
        slug: null
      }
    };
  },
  beforeUpdate() {
    $("#login").modal("hide");
  },
  created() {
    let ref = db.collection("profiles");
    console.log("ss");
    ref
      .where("aui", "==", firebase1.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          this.profile.name = user.data().name;
          this.profile.email = user.data().email;
          this.profile.phone = user.data().phone;
        });
      })
      .then(() => {});
    const user = firebase1.auth().currentUser;
    if (user.email == null) {
      this.reroute = 2;
    } else {
      this.reroute = 1;
    }
  },
  methods: {
    confirmmail() {
      var user = firebase1.auth().currentUser;

      user
        .sendEmailVerification()
        .then(() => {
          Toast.fire({
            type: "info",
            title: "Email Confermation sent"
          });
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    changeedit() {
      this.edit = true;
    },
    resetPassword() {
      const auth = firebase1.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          Toast.fire({
            type: "success",
            title: "Email sent"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProfile() {
      if (
        this.profile.name == null ||
        this.profile.phone.length == 0 ||
        this.profile.email == null ||
        this.profile.phone == null
      ) {
        this.feedback = "Enter all fields";
      } else {
        if (this.reroute == 2) {
          console.log(this.profile.name);
          this.slug = slugify(this.profile.name, {
            replacement: "-",
            remove: /[!@#$%^&*()]/g,
            lower: true
          });
          let ref = db.collection("profiles").doc(this.slug);
          ref.get().then(doc => {
            if (doc.exists) {
              this.$router.go(-2);
            } else {
              var user = firebase1.auth().currentUser;
              db.collection("profiles")
                .doc(this.slug)
                .set({
                  name: this.profile.name,
                  aui: user.uid,
                  email: this.profile.email,
                  photo: "/img/svg/man.svg",
                  phone: this.profile.phone
                })

                .then(() => {
                  var user = firebase1.auth().currentUser;

                  user
                    .sendEmailVerification()
                    .then(() => {
                      Toast.fire({
                        type: "success",
                        title: "Email Confermation sent"
                      });
                    })

                    .catch(error => {
                      // An error happened.
                      alert("Refresh and Try Again !");
                    });

                  this.$router.push({ name: "home" });
                })

                .catch(error => {
                  // Handle Errors here.
                  // ...
                });
            }
          });
        } else {
          var user = firebase1.auth().currentUser;

          db.collection("profiles")
            .where("aui", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("profiles")
                  .doc(doc.id)
                  .update({
                    phone: this.profile.phone
                  })
                  .then(() => {
                    document.location.reload(true);
                  });
              });
            })
            .then(() => {
              if (this.reroute == 1) {
                this.$router.go(-1);
              } else {
                this.$router.go(-2);
              }
            });
        }
        this.edit = false;
      }
    },
    uploadImage() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
}
</style>