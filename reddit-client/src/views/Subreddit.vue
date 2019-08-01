

<template>
    
    <section>
        <h1>{{subreddit.name}}</h1>
        <button @click="showForm = !showForm" class="button is-primary">Toggle Form</button>
        <form v-if="showForm" @submit.prevent="onCreatePost()">
            <b-field label="Title">
                <b-input v-model="post.title" required></b-input>
            </b-field>
            <b-field label="Description">
                <b-input type="textarea" v-model="post.description"></b-input>
            </b-field>
            <b-field label="URL">
                <b-input v-model="post.URL" type="url"></b-input>
            </b-field>
            <button class="button is-success">Add Post</button>
        </form>
        <pre>{{posts}}</pre>
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
        ...mapGetters('subreddit', ['subreddit'])
    },
    methods: {
        ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
        async onCreatePost() {
            if (this.post.title && (this.post.description || this.post.URL)) {
                await this.createPost(this.post);
            }
        },
    },
  };
</script>