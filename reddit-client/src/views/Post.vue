<template>
<section>
    <h1>route.params.post_id  {{$route.params.post_id}}</h1>
    <h1>route.params.name  {{$route.params.name}}</h1>
    <h1>route.params.post  {{$route.params.post}}</h1>
    <!-- <h1>post_id {{post_id}}</h1> -->
    
    <div class="card">
  <div class="card-image">
      
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
       
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
        
      </div>
      <div class="media-content">
        <p class="title is-4">여기에 타이틀</p>
        <p class="subtitle is-6">@여기에 유저명</p>
      </div>
    </div>

    <div class="content">
     여기에 description
      
      <br>
      <time datetime="2016-1-1">여기 시간</time>
    </div>
  </div>
  <footer class="card-footer" v-if="isLoggedIn">
    <a href="#" class="card-footer-item" @click="showForm = !showForm">Edit Post </a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>

<div class="card" v-if="showForm">
    <div class="card-content">
        <form 
          @submit.prevent="onEditPost()">
          <b-field label="Title">
              <b-input v-model="post.title"
                  required></b-input>
          </b-field>
          <b-field label="Description">
              <b-input type="textarea"
                  v-model="post.description"></b-input>
          </b-field>
          <b-field label="URL">
              <b-input v-model="post.URL"
                  type="url"></b-input>
          </b-field>
          <button class="button is-success">Edit Post</button>
      </form>
    </div>
</div>

<div class="card" v-if="isLoggedIn">
  <div class="card-content">
    <textarea class="textarea" placeholder="Reply"></textarea>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>
        Add Comment
      </span>
    </p>
    <p class="card-footer-item">
      <span>
        Edit Comment
      </span>
    </p>
    <p class="card-footer-item">
      <span>
        Delete Comment
      </span>
    </p>
  </footer>
</div>


</section>
  
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        data: () => ({
          showForm: false,
          post: {
              title: '',
              description: '',
              url: '',
          }
        }),
        
        mounted() {

        },

        watch: {

        },

        computed: {
          ...mapState('auth', ['isLoggedIn', 'user']),
        },

        methods: {
          //URL이미지 체크
          isImage(url) {
              // console.log(url);
              if(!url){
                  //return ("Placeholder image");
                  return null;
              } else {
                  return url.match(/(png|jpg|jpeg|gif)$/);
                  
              }   
          },

          //  수정
          async onEditPost(){
            if (this.post.title && (this.post.description || this.post.URL)) {
                    
                    this.createPost(this.post);
                    this.post = {
                        title: '',
                        description: '',
                        url: ''
                    };
                this.showForm = false;
            }
          },
      
        },

        
    };
</script>

<style>

</style>
