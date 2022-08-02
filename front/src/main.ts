import "@mdi/font/css/materialdesignicons.css";
import Vue, { Component, CreateElement, VNode } from "vue";
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';


if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_VERSION !== '') {
    Sentry.init({
        dsn: 'https://d72cc9411e1142d0b244e4319c20925d@o565559.ingest.sentry.io/5707207',
        release: process.env.VUE_APP_VERSION,
        integrations: [
            new VueIntegration({ Vue, attachProps: true }),
            // new Integrations.BrowserTracing() TODO not available in current plan
        ],
        tracesSampleRate: parseFloat(process.env.VUE_APP_SENTRY_TRACES_SAMPLE_RATE || '1.0')
    });
}

import Vuex from "vuex";
Vue.use(Vuex);
import store from "@/store";

import Buefy from "buefy";
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);

Vue.config.productionTip = false;

import App from "@/App.vue";
import i18n from "@/i18n";
import { router } from "@/router";

import VueHotkey from "v-hotkey";
Vue.use(VueHotkey);

Vue.prototype.$goto = function (path: string, callback?: () => void) {
    this.$router.push(path)
        .catch(() => { /* do nothing */ })
        .finally(() => {
            if (callback) {
                callback();
            }
        });
};

// propagate ("bubble") Vue events up from the emitting component
// https://stackoverflow.com/a/54940012/27391
Vue.prototype.$bubble = function (eventName: string, ...args: any[]) {
    let component: Vue = this as Vue;
    do {
        component.$emit(eventName, ...args);
        component = component.$parent;
    } while (component);
};

new Vue({
    i18n,
    store: store.original,
    router,
    render: (h: CreateElement): VNode => h(App)
}).$mount('#app');
