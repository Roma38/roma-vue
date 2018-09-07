<template>
  <b-container>
    <b-button v-if="isLoggedIn" href="#/my-profile" variant="outline-success">My profile</b-button>

    <b-button-group v-else>
      <b-button href="#/registration" variant="outline-success">Registration</b-button>
      <b-button href="#/login" variant="outline-success">Login</b-button>
    </b-button-group>

    <b-card v-for="post in posts" :key="post.id" :title="post.postTitle" class="text-left">
      {{ post.postBody }}
      <p slot="footer" class="text-right">{{new Date(post.postDate).toLocaleString()}} <em>{{post.author ? post.author : "Anonymous"}}</em></p>
    </b-card>

    <b-form @submit.prevent="onSubmit" v-if="isLoggedIn" class="border rounded mt-3">
      <h2 class="m-3">Add post</h2>

      <b-form-group label="Title: " horizontal label-text-align="sm-right">
        <b-col col md="8">
          <b-form-input type="text" v-model="postTitle" min="6"></b-form-input>
        </b-col>
      </b-form-group>

      <b-form-group label="Post: " horizontal label-text-align="sm-right">
        <b-form-textarea v-model="postBody" rows="3" required></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

  </b-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import { API_HOST } from "../config.js";

export default {
  name: "home",
  data: function() {
    return {
      posts: [],
      isLoggedIn: null,
      postTitle: "",
      postBody: ""
    };
  },
  mounted: function() {
    axios
      .get(`//${API_HOST}/posts`, { withCredentials: true })
      .then(response => {
        this.posts = response.data.posts;
        this.isLoggedIn = response.data.isLoggedIn;
      });
  },
  methods: {
    onSubmit: function() {
      axios
        .post(
          `//${API_HOST}/posts`,
          { postTitle: this.postTitle, postBody: this.postBody },
          { withCredentials: true }
        )
        .then(response => {
          this.posts = response.data;
        });
    }
  }
};
</script>
