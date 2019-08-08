/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseAction => firestoreAction
 *  bindFirebaseRef => bindFirestoreRef
 */
import { firestoreAction } from 'vuexfire';
import db from '@/db';
import firebase from '@/firebase';

const comments = db.collection('comments')

const state = {
    subreddits: [],
    posts: [],
    comments: [],
};

const getters = {
    subreddit: (state) => state.subreddits[0] ? state.subreddits[0] : {},
}

const actions = {
    initComment: firestoreAction(({ bindFirestoreRef }, name) => {
        bindFirestoreRef('comments', db.collection('comments').where('name', '==', name));

    }),


};

export default {
    namespaced: true,
    state,
    actions,
    getters,
};