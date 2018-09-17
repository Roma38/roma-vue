<template>
  <div class="wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group horizontal label="First name:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="firstName" type="text"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Last name:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="lastName" type="text"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Gender:" label-cols="5" label-text-align="sm-right">
        <b-form-radio-group v-model="gender">
          <b-form-radio value="male">Male</b-form-radio>
          <b-form-radio value="female">Female</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-form-group horizontal label="Date of Birth:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="birthDate" type="date"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Country:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="country" type="text"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="City:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="city" type="text"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Phone number:" label-cols="5" label-text-align="sm-right">
        <b-form-input v-model="phoneNumber" type="tel"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { API_HOST } from "../config.js";

export default {
  mounted: function() {
    axios
      .get(`//${API_HOST}/profile`, { withCredentials: true })
      .then(response => {
        /* this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.gender = response.data.gender;
        this.birthDate = response.data.birthDate;
        this.country = response.data.country;
        this.city = response.data.city;
        this.phoneNumber = response.data.phoneNumber; */

        for (let prop in response.data) {
          this[prop] = response.data[prop];
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  },
  data: function() {
    // TODO будет ли работать форма если мы удалим эти начальные данные?
    return {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      country: "",
      city: "",
      phoneNumber: ""
    };
  },
  methods: {
    onSubmit: function() {
      const {
        firstName,
        lastName,
        gender,
        birthDate,
        country,
        city,
        phoneNumber
      } = this;

      axios
        .put(
          `//${API_HOST}/profile`,
          {
            firstName,
            lastName,
            gender,
            birthDate,
            country,
            city,
            phoneNumber
          },
          { withCredentials: true }
        )
        .then(response => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response.data);
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
</style>
