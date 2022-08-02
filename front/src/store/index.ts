import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import api from './api.module';
import candidate from './candidate.module';
import vaccinator from './vaccinator.module';
import admin from './admin.module';

Vue.use(Vuex);

// refer to https://github.com/paleo/direct-vuex#implement-a-vuex-store-with-typed-helpers

const store = createDirectStore({
    modules: {
        api,
        candidate,
        vaccinator,
        admin,
    },
    strict: process.env.NODE_ENV !== 'production'
});

const directStore = store.store;
export default directStore;

export type AppStore = typeof store;

declare module 'vuex' {
    interface Store<S> {
        direct: AppStore;
    }
}
