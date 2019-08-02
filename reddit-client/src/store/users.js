/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseAction => firestoreAction
 *  bindFirebaseRef => bindFirestoreRef
 */
import { firestoreAction } from 'vuexfire';
import db from '@/db';

const state = {
    users: [],
};

const getters = {
    usersById(state) {
        return state.users.reduce((byId, user) => {
            byId[user.id] = user;
            return byId;
        }, {});
    },
};

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {

        bindFirestoreRef('users', db.collection('users'));
    }),
};

export default {
    namespaced: true,
    state,
    actions,
    getters
};