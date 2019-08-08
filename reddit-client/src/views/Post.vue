<template>
<section>
    <h1>route.params  {{$route.params.post_id}}</h1>
    <br>
    <h1>route.params  {{$route.params}}</h1>
    <br>
    <h1>route.params.post.URL  {{$route.params.post.URL}}</h1>
    <br>
    <h1>route.params.post_URL  {{$route.params.post_URL}}</h1>
    <br>
    <h1>this.route.params  {{this.$route.params}}</h1>
    <br>
    <h1>route.params.post  {{$route.params.post}}</h1>
    <br>
    <h1>user  {{user}}</h1>
    <br>
    <h1>posts  {{posts}}</h1>
    <br>
    <h1>this.post  {{this.post}}</h1>

    
    <div class="card">
        <div class="card-image"
                      v-if="isImage($route.params.post.URL)"
                      alt="Placeholder image">
                      <figure class="image">
                          <img :src="$route.params.post.URL"
                              alt="Placeholder image">
                      </figure>
                  </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="loadedUsersById[$route.params.post.user_id].image"
                            alt="Placeholder image">
                    </figure>

                </div>
                <div class="media-content">
                    <p class="title is-4"
                        v-if="!$route.params.post.URL">{{$route.params.post.title}}</p>
                    <p class="title is-4"
                        v-if="$route.params.post.URL"><a :href="$route.params.post.URL"
                            target="_blank">{{$route.params.post.title}}</a></p>
                    <p class="subtitle is-6">@{{loadedUsersById[$route.params.post.user_id].name}} </p>
                </div>
            </div>

            <div class="content">
                {{$route.params.post.description}}

                <br>
                <time>{{getUpdateDate($route.params.post.updated_at)}}</time>
            </div>
        </div>
        <footer class="card-footer"
            v-if="user && user.id == this.$route.params.post.user_id">
            <a href="#"
                class="card-footer-item"
                @click="showForm = !showForm">Edit Post </a>
            <a class="card-footer-item" @click="deleteThisPost($route.params.post.id)">
              delete
            </a>
        </footer>
    </div>

    <div class="card"
        v-if="showForm">
        <div class="card-content">
            <form @submit.prevent="onEditPost()">
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

    <div class="card"
        v-if="isLoggedIn">
        <div class="card-content">
            <textarea class="textarea"
                placeholder="Reply"></textarea>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <span>
                    Add Comment
                </span>
            </p>
        </footer>
    </div>

    <div class="card">
        <div class="card-content">
            여기에 코멘트
        </div>
        <footer class="card-footer">

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
    import db from '@/db';

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
          ...mapState('subreddit', ['posts']),
          ...mapGetters({
            subreddit: 'subreddit/subreddit',
            usersById: 'users/usersById',
          }),
          // user정보 불러오기
          loadedUsersById() {
          return this.posts.reduce((byId, post) => {
              byId[post.user_id] = this.usersById[post.user_id] || {
                name: 'Loading...',
                image: 'https://bulma.io/images/placeholders/48x48.png'
              };
              return byId;
            }, {});
        },
        },

        methods: {
          ...mapActions('subreddit', ['createPost', 'initPosts', 'deletePost']),
          ...mapActions('users', {initUsers: 'init'}),
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

          //날짜
          getUpdateDate(date){
              const getDate = (date) => {
                //   console.log(date);
                  const converDate = new Date(date);
                //   console.log(converDate);
                  return converDate;
                  
              }
              return getDate(this.$route.params.post.updated_at.seconds *1000)
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

          async deleteThisPost(post_id) {
              this.$router.go(-1);
              this.deletePost(post_id);
              // await db.collection('posts').doc(post_id).delete();

          },  

          
        },

        
    };
</script>

<style>

</style>
