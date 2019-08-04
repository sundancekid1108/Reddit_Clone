/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseAction => firestoreAction
 *  bindFirebaseRef => bindFirestoreRef
 */
import { firestoreAction } from 'vuexfire';
import db from '@/db';
import firebase from '@/firebase';

const posts = db.collection('posts')

const state = {
    subreddits: [],
    posts: [],
};

const getters = {
    subreddit: (state) => state.subreddits[0] ? state.subreddits[0] : {},
}

const actions = {
    initSubreddit: firestoreAction(({ bindFirestoreRef }, name) => {
        bindFirestoreRef('subreddits', db.collection('subreddits').where('name', '==', name));

    }),
    initPosts: firestoreAction(({ bindFirestoreRef }, subreddit_id) => {
        bindFirestoreRef('posts', posts.where('subreddit_id', '==', subreddit_id));
    }),




};

export default {
    namespaced: true,
    state,
    actions,
    getters,
};