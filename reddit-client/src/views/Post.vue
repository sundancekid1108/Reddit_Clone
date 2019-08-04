<template>
    <section>
        <h1>{{$route.params.post_id}}</h1>
        <h1>{{$route.params.name}}</h1>

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
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      
      <br>
      <time datetime="2016-1-1">시간</time>
    </div>
  </div>

    <footer class="card-footer">
                        
                          <a href="#"
                              class="card-footer-item" v-if="user && user.id == post.user_id">Edit</a>
                          <a class="card-footer-item" @click="deletePost(post.id)" v-if="user && user.id == post.user_id">Delete</a>
                      </footer>

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
        loadedUsersById() {
          return this.posts.reduce((byId, post) => {
              byId[post.user_id] = this.usersById[post.user_id] || {
                name: 'Loading...',
                image: 'https://bulma.io/images/placeholders/48x48.png'
              };
              return byId;
            }, {});
        },
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
                    this.post = {
                        title: '',
                        description: '',
                        url: ''
                    };
                this.showForm = false;
            }
        }, 
        getCreated(index) {
          const timeSince = (date) => {
            // console.log(index);
            // console.log(date);
            const seconds = Math.floor((new Date() - date) / 1000);
            if(!seconds){
              return (seconds +=0 );
            }
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
          return timeSince(this.posts[index].created_at.seconds *1000) < 0 ? '0 seconds' + ' ago' : timeSince(this.posts[index].created_at.seconds *1000) + ' ago'
      }    
    
    },
    
  };
</script>

<style>

</style>
