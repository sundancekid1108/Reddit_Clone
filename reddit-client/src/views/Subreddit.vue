<template>
  <section>
      <button v-if="isLoggedIn"
          @click="showForm = !showForm"
          class="button is-primary">Toggle Form</button>
      <form v-if="showForm && isLoggedIn"
          @submit.prevent="onCreatePost()">
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
          <button class="button is-success">Add Post</button>
      </form>

      <form class="search-form">
          <b-field label="Search">
              <b-input v-model="searchTerm"
                  required></b-input>
          </b-field>
      </form>

      <div class="posts columns is-multiline is-4">
          <div class="column is-4"
              v-for="(post, index) in filteredPosts"
              :key="post.id">
              <div class="card">
                  <div class="card-image"
                      v-if="isImage(post.URL)"
                      alt="Placeholder image">
                      <figure class="image">
                          <img :src="post.URL"
                              alt="Placeholder image">
                      </figure>
                  </div>
                  <div class="card-content">
                      <div class="media">
                          <div class="media-left">
                              <figure class="image is-48x48">
                                  <img :src="loadedUsersById[post.user_id].image"
                                      alt="Placeholder image">

                              </figure>
                          </div>
                          <div class="media-content">
                              <p class="title is-4"
                                  v-if="!post.URL">{{post.title}}</p>
                              <p class="title is-4"
                                  v-if="post.URL"><a :href="post.URL"
                                      target="_blank">{{post.title}}</a></p>
                              <p class="subtitle is-6">@{{loadedUsersById[post.user_id].name}}</p>
                          </div>

                      </div>

                      <div class="content">
                          
                          {{post.description}}
                          <br>
                          <!-- <time>{{getCreated(index)}}</time> -->
                          <br>
                          
                          <time>{{getUpdateDate(index)}}</time>
                          
                      </div>
                  </div>

                  
                      <footer class="card-footer">
                          <router-link                            
                              :to="{
                              name: 'post',
                              params: {
                                name: $route.params.name,
                                post: post,
                                post_id: post.id,
                                post_URL: post.URL
                              }
                            }" class="card-footer-item">View Post</router-link>
                          
                          <a class="card-footer-item" @click="deletePost(post.id)" v-if="user && user.id == post.user_id">Delete</a>
                      </footer>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
  export default {
    data: () => ({
        showForm: false,
        searchTerm: '',
        post: {
            title: '',
            description: '',
            url: '',
        }
    }),
    mounted() {
        this.initUsers();
        this.initSubreddit(this.$route.params.name);
    },

    watch: {
        '$route.params.name'(){
            this.initSubreddit(this.$route.params.name);
        },
        subreddit(){
            if(this.subreddit.id){
                this.initPosts(this.subreddit.id);
            }
        },
    },

    computed: {
        ...mapState('subreddit', ['posts']),
        ...mapState('auth', ['isLoggedIn', 'user']),
        ...mapGetters({
          subreddit: 'subreddit/subreddit',
          usersById: 'users/usersById',
        }),

        //user 정보 불러오기 ..
        loadedUsersById() {
          return this.posts.reduce((byId, post) => {
              byId[post.user_id] = this.usersById[post.user_id] || {
                name: 'Loading...',
                image: 'https://bulma.io/images/placeholders/48x48.png'
              };
              return byId;
            }, {});
        },

        // 게시물 검색
        filteredPosts(){
          if(this.searchTerm){
            const regexp = new RegExp(this.searchTerm, 'gi');
            return this.posts.filter(post =>
            (post.title + post.description).match(regexp));
          }
          return this.posts;
        },
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
        ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts', 'deletePost']),
        ...mapActions('users', {initUsers: 'init'}),

        async onCreatePost() {
            if (this.post.title && (this.post.description || this.post.URL)) {
                    
                    this.createPost(this.post);
                    console.log(this.post);
                    this.post = {
                        title: '',
                        description: '',
                        url: ''
                    };
                this.showForm = false;
                console.log(this);
                
            }
        }, 

        getCreated(index) {
          const timeSince = (date) => {
            // console.log("index" + index);
            // console.log("date " + date);

            // const testdate = new Date(date);
            // console.log(testdate);
            // console.log(typeof(testdate));
            const seconds = Math.floor((new Date() - date) / 1000 + 1);
            
            let interval = Math.floor(seconds / 31536000);
            
            if (interval > 1) {
              return `${interval} years`;
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
              return `${interval} months`;
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
              return `${interval} days`;
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
              return `${interval} hours`;
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
              return `${interval} minutes`;
            }

            return Math.floor(seconds) + " seconds";  
        }
            return timeSince(this.posts[index].created_at.seconds *1000) < 0 ? '0 seconds' + ' ago' : timeSince(this.posts[index].created_at.seconds *1000) + ' ago';
          
      },
    
        //날짜
      getUpdateDate(index){
          const getDate = (date) => {
            //   console.log(date);
              const converDate = new Date(date);
            //   console.log(converDate);
              return converDate;
              
          }
        //   console.log(this.posts[index].updated_at.seconds);
          return getDate(this.posts[index].updated_at.seconds *1000)
      }

        
        
    },
    
  };
</script>

<style>
.posts {
  margin-top: 2em;
}

.card {
  height: 100%;
  margin: 1%;
  border-radius: 5px;
}



.card img {
  border-radius: 5px;
}
.search-form {
        margin-top: 2em;
    }
</style>