<template>
  <div class="wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group horizontal label="Email:" label-text-align="sm-right">
        <b-form-input v-model="email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Password:" label-text-align="sm-right">
        <b-form-input v-model="password" type="password" required minlength="8"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-alert class="alert-window" variant="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
      {{error}}
    </b-alert>
  </div>
</template>

<script>
import axios from "axios";
import { API_HOST } from "../config.js";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      error: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    onSubmit: function() {
      const { email, password } = this;
      this.showDismissibleAlert = false;

      axios
        .post(
          `//${API_HOST}/login`,
          {
            email,
            password
          },
          { withCredentials: true } // TODO добавить этот флаг ко всем запросам
        )
        .then(response => console.log(response.data))
        .catch(error => {
          this.error = error.response.data[0].message;
          /* console.log(error); */
          this.showDismissibleAlert = true;
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
