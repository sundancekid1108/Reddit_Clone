<template>
    
  <section>
    <!-- <aside class="menu">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li v-for="subreddit in subreddits"
                :key="subreddit.id">
                <router-link :to="{ name: 'subreddit', params: { name: subreddit.name } }">
                    {{subreddit.name}}
                </router-link>
            </li>
        </ul>
    </aside> -->
    <div class="posts columns is-multiline is-4">
      <div class="column is-4" v-for="subreddit in subreddits"
                :key="subreddit.id">
      <div class="card" >
        <router-link :to="{ name: 'subreddit', params: { name: subreddit.name } }">
                    {{subreddit.name}}
                </router-link>
      </div>
      </div>        
  </div>
  </section> 
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    mounted() {
      this.init();
    },
    computed: mapState('subreddits', ['subreddits']),
    methods: mapActions('subreddits', ['init']),
  };
</script>

<style>

.card {
  height: 100%;
  margin: 1%;
  border-radius: 5px;
  
}

</style>