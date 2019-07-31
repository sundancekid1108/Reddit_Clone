/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseAction => firestoreAction
 *  bindFirebaseRef => bindFirestoreRef
 */
import { firestoreAction } from 'vuexfire';
import db from '@/db';

const state = {
    subreddits: [],
};

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('subreddits', db.collection('subreddits'));
    }),
};

export default {
    namespaced: true,
    state,
    actions,
};