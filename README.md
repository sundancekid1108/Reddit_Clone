# Full Stack Reddit Clone with Firebase Firestore, Vue.js/Vuex, Bulma

* [✔] Generate Vue App
* [✔] Create Firebase Project
  * [✔] STRICT RULES
* [✔] Add Firebase Auth
  * https://firebase.google.com/docs/auth/web/google-signin
  * https://firebase.google.com/docs/auth/web/manage-users
    * Save user on login
      * [✔]Update Rules
* [✔] Add VuexFire
  * https://github.com/posva/vuexfire/tree/firestore
  * https://vuefire.vuejs.org/vuexfire/upgrading-from-v2.html#renamed-imports
  * vuefire는 버젼이 바뀌어 몇 몇 코드가 수정됨..
* [✔] Add a few subreddits in Firestore
  * general
  * javascript
  * learn-programming
  * pics
  * funny
* [✔] dotenv cofig
* [✔] Show Subreddits on Home Page
* [✔] Show Single Subreddit
* [ ] New Post Form
  * Update Rules
* [ ] Display Posts on Subreddit Page
  * Types: Image/Text/Url
* [ ] UpVote/DownVote Posts
  * Update Rules
  * [ ] Order by total score
* [ ] Add comment to Post
  * Update Rules
* [ ] User Profile
  * [ ] Show Submitted Posts
  * [ ] Show UpVoted Posts
  * [ ] Show Comments

## Extra
* [ ] Edit Post
* [ ] Edit Comment
* [ ] Search/Filter Posts
* [ ] UpVote/DownVote Comment
* [ ] Reply to Comment
* [ ] Cloud Function Score Aggregator
  * https://firebase.google.com/docs/firestore/solutions/aggregation#solution_cloud_functions
* [ ] Delete Post
  * [ ] Cloud Function "Cascade Delete" comments

## Resources

* https://angularfirebase.com/tag/firestore/