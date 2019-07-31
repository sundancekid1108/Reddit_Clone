/* eslint-disable */
/**
 * vuexfire 버전이 바뀌면서 몇 몇 코드가 바뀜
 *  firebaseMutations => vuexfireMutations
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {
    vuexfireMutations
} from 'vuexfire';

import auth from './auth';
import subreddits from './subreddits';
//import subreddit from './subreddit';

Vue.use(Vuex);

export default new Vuex.Store({
    mutations: vuexfireMutations,
    modules: {
        auth,
        subreddits,
        // subreddit,
    },
});