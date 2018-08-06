<template>
  <div class="wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group horizontal label="Email:">
        <b-form-input v-model="email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Password:">
        <b-form-input v-model="password" type="password" required minlength="8"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>    
  </div>
</template>

<script>
import axios from "axios";
import { API_HOST } from "../config.js";

export default {
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit: function() {
      const { email, password } = this;

      axios
        .post(`//${API_HOST}/login`, {
          email,
          password
        })
        .then(response => console.log(response.data));
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  margin: 0 auto;
}
</style>
