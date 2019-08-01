/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseAction => firestoreAction
 *  bindFirebaseRef => bindFirestoreRef
 */
import { firestoreAction } from 'vuexfire';
import db from '@/db';

const posts = db.collection('posts')

const state = {
    posts: [],
};

const actions = {
    async createPost(_, post) {
        const result = posts.doc();
        console.log(result);
    },
    //init: firestoreAction(({ bindFirestoreRef }, name) => {
    //    bindFirestoreRef('posts', db.collection('posts'));
    //}),
};

export default {
    namespaced: true,
    state,
    actions,
};