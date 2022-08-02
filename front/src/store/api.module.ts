import store from '@/store';
import { ToastProgrammatic as Toast } from 'buefy';
import i18n from "@/i18n";
import { AxiosResponse } from 'axios';
import { BNoticeConfig } from 'buefy/types/components';

interface Error {
    field: string;
    message: string;
}

type ApiError = AxiosResponse<Array<Error>>;

export interface ApiState {
    inProgress: Map<string, boolean>;
    errors: Array<ApiError>;
    errorsByComponentName: Map<string, string>;
    toastMessages: Array<string>;   // toast messages currently being displayed (to dedupe identical messages)
}


export default {
    namespaced: true as const,
    state: (): ApiState => {
        return {
            inProgress: new Map(),
            errors: [],
            errorsByComponentName: new Map(),
            toastMessages: [],
        };
    },
    getters: {
        inProgress: (state: ApiState) => (name: string): boolean => {
            if (name.startsWith('/')) {
                // if a regexp is provided, find all matching entries and return true
                // if at least one of them is in progress
                // (unfortunately, we cannot pass a RegExp instance directly with "string | RegExp" type,
                // the RegExp gets converted to a string by the internals of vuex...)
                const r = new RegExp(name.substring(1));
                const filtered = [...state.inProgress.entries()].filter(([key, flag]) => r.test(key)).map(([key, flag]) => flag);
                if (filtered.length > 0) {
                    return filtered.reduce((pv, cv) => pv || cv);
                } else {
                    return false;
                }
            } else {
                return state.inProgress.get(name) ?? false;
            }
        },
        error: (state: ApiState) => (name: string): string | undefined => {
            return state.errorsByComponentName.get(name);
        }
    },
    mutations: {
        push(state: ApiState, error: ApiError) {
            if (Object.prototype.hasOwnProperty.call(error, 'data') && Array.isArray(error.data)) {
                error.data.forEach(e => {
                    // TODO dispatch error event
                    let message = state.errorsByComponentName.get(e.field);
                    if (message === undefined) {
                        message = e.message;
                    } else if (!message.includes(e.message)) {
                        message = message + ' ' + e.message;
                    }
                    state.errorsByComponentName = new Map(state.errorsByComponentName.set(e.field, message));
                    store.dispatch.api.openToast({
                        duration: 5000,
                        message: e.message,
                        type: "is-danger",
                        position: "is-bottom",
                        queue: false
                    });
                });
            } else {
                interface ApiException {
                    code: number;
                    message: string;
                }
                let msg;
                if (error.status == 500) {
                    msg = i18n.t('error.http.500', error);
                } else if (error.status == 502 || error.status == 503) {
                    msg = i18n.t('error.http.5XX', error);
                } else if (Object.prototype.hasOwnProperty.call(error, 'data') && typeof error.data === 'string') {
                    msg = error.data;
                } else if (Object.prototype.hasOwnProperty.call(error, 'data') && 'message' in (error.data as any) && 'code' in (error.data as any)) {
                    msg = i18n.t('error.http.withMessage', error.data as any as ApiException);
                } else {
                    msg = i18n.t('error.http.other', error);
                }
                store.dispatch.api.openToast({
                    duration: 5000,
                    message: msg as string,
                    type: "is-danger",
                    position: "is-bottom",
                    queue: false
                });
            }
            state.errors.push(error);
        },
        pop(state: ApiState, error: ApiError) {
            const i = state.errors.indexOf(error);
            if (i > -1) {
                state.errors.splice(i, 1);
            }
        },
        clear(state: ApiState) {
            state.errors = [];
            state.errorsByComponentName = new Map();
        },
        resetError(state: ApiState, name: string | string[]) {
            const names = ([] as string[]).concat(name);
            if (names.map(n => state.errorsByComponentName.delete(n)).some(t => t)) {
                state.errorsByComponentName = new Map(state.errorsByComponentName);
            }
        },
        // helper function to open toasts and dedupe toasts with the same message
        openToast(state: ApiState, payload: BNoticeConfig) {
            if (!state.toastMessages.includes(payload.message as string)) {
                state.toastMessages.push(payload.message as string);
                Toast.open(payload).$on('close', () => {
                    store.dispatch.api.closeToast({ message: payload.message as string });
                });
            }
        },
        closeToast(state: ApiState, message: string) {
            const index = state.toastMessages.indexOf(message);
            if (index > -1) {
                state.toastMessages.splice(index, 1);
            }
        },
        // need to rebuild map to propagate changes,
        // see https://stackoverflow.com/questions/37130105/does-vue-support-reactivity-on-map-and-set-data-types
        start(state: ApiState, name: string) {
            state.inProgress = new Map(state.inProgress.set(name, true));
        },
        end(state: ApiState, name: string) {
            state.inProgress = new Map(state.inProgress.set(name, false));
        }
    },
    actions: {
        success: (_context: any, payload: { name: string; msg?: string; args?: Record<string, any> }) => {
            store.commit.api.end(payload.name);
            if (payload.msg) {
                const message = i18n.t(payload.msg, payload.args) as string || payload.msg;
                store.dispatch.api.openToast({
                    duration: 3500,
                    message: message,
                    type: "is-success",
                    position: "is-bottom",
                    queue: false
                });
            }
        },
        failure: (_context: any, payload: { name: string; error: ApiError }) => {
            store.commit.api.end(payload.name);
            store.dispatch.api.error({ error: payload.error });
        },
        error: (_context: any, payload: { error: ApiError }) => {
            store.commit.api.push(payload.error);
            // auto-clear error after timeout
            setTimeout(() => store.commit.api.pop(payload.error), 3000);
        },
        resetError: (_context: any, payload: { name: string | string[] }) => {
            store.commit.api.resetError(payload.name);
        },
        clearErrors: () => {
            store.commit.api.clear();
        },
        openToast: (_context: any, payload: BNoticeConfig) => {
            store.commit.api.openToast(payload);
        },
        closeToast: (_context: any, payload: { message: string }) => {
            store.commit.api.closeToast(payload.message);
        },
        start: (_context: any, payload: { name: string }) => {
            store.commit.api.start(payload.name);
        },
        end: (_context: any, payload: { name: string }) => {
            store.commit.api.end(payload.name);
        }
    }
};
