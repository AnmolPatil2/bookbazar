<template>
  <v-layout row justify-center>
    <v-dialog app hide-overlay="fasle" v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add a New Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field v-model="title" label="Title" prepend-icon="folder" :rules="inputRules"></v-text-field>
            <v-textarea
              v-model="content"
              label="Information"
              prepend-icon="edit"
              :rules="inputRules"
            ></v-textarea>

            <v-menu v-model="menu" :close-on-content-click="false">
              <v-text-field
                slot="activator"
                :rules="inputRules"
                :value="formattedDate"
                clearable
                label="Due date"
                prepend-icon="date_range"
              ></v-text-field>
              <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
            </v-menu>

            <v-spacer></v-spacer>

            <v-btn flat @click="submit" class="success mx-0 mt-3">Add Project</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);
import format from "date-fns/format";
export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      menu: false,
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Minimum length is 3 characters"
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.title, this.content);
      }
    }
  },
  computed: {
    formattedDate() {
      console.log(this.due);
      return this.due ? format(this.due, "Do MMM YYYY") : "";
    }
  }
};
</script>