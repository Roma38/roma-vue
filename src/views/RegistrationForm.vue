<template>
  <div class="wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group horizontal label="Email:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Password:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="password" type="password" required :state="passwordState"></b-form-input>
        <b-form-invalid-feedback>{{passwordFeedback}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group horizontal label="Confirm password:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="confirmPass" type="password" required :state="confirmPassState" :disabled="!passwordState"></b-form-input>
        <b-form-invalid-feedback>It's not the same password</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>

      <b-alert class="alert-window" variant="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
        <ul class="list-unstyled">
          <li v-for="error in errors" :key="error.message">{{error.message}}</li>
        </ul>
      </b-alert>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { API_HOST } from "../config.js";

const regEx2 = /[0-9]/;
const regEx3 = /[a-z]/;

export default {
  data: function() {
    return {
      email: "",
      password: "",
      confirmPass: "",
      errors: "",
      showDismissibleAlert: false
    };
  },
  computed: {
    passwordState() {
      if (this.password.length < 1) {
        return null;
      }

      if (
        this.password.length < 8 ||
        !String(this.password).match(regEx2) ||
        !String(this.password)
          .toLowerCase()
          .match(regEx3)
      ) {
        return false;
      }

      return true;
    },
    passwordFeedback() {
      if (this.password.length < 8) {
        return "Password must be longer";
      }

      if (!String(this.password).match(regEx2)) {
        return "Password must contain numbers too";
      }

      if (
        !String(this.password)
          .toLowerCase()
          .match(regEx3)
      ) {
        return "Password must contain letters too";
      }
    },
    confirmPassState() {
      if (this.confirmPass.length < 5) {
        return null;
      }

      if (this.password !== this.confirmPass) {
        return false;
      }

      return true;
    }
  },
  methods: {
    onSubmit: function() {
      const { email, password, confirmPass } = this;

      axios
        .post(`//${API_HOST}/registration`, {
          email,
          password,
          confirmPass
        })
        .then(response => console.log(response.data))
        .catch(request => {
          console.log(request.response.data);
          this.showDismissibleAlert = true;
          this.errors = request.response.data;
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  margin: 0 auto;
}

.alert-window {
  margin-top: 20px;
}
</style>
