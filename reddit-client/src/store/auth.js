/* eslint-disable eol-last */
/* eslint-disable */
import firebase from '../firebase';
import db from '../db';

const state = {
    user: {},
    isLoggedIn: false,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
    },
};

const actions = {
    async login({ commit }) {
        const provider = new firebase.auth.GoogleAuthProvider();
        const profile = await firebase.auth().signInWithPopup(provider);
        //console.log(profile.user);
        const setUser = {
            id: profile.user.uid,
            name: profile.user.displayName,
            image: profile.user.photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection('users').doc(setUser.id).set(setUser);
        commit('setUser', setUser);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};