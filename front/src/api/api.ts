import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { router } from "@/router";

export type UploadProgressFunction = (progress: number) => void;

export const api = axios.create();

api.defaults.baseURL = window.location.origin + '/api/private';
api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
api.defaults.withCredentials = true;

// serialize array of params as multiple params without brackets
// (see https://github.com/axios/axios/issues/1443)
api.defaults.paramsSerializer = function (params) {
    const usp = new URLSearchParams();
    if (params !== null && params !== undefined) {
        for (const k in params) {
            const v = params[k];
            if (Array.isArray(v)) {
                for (const t of v) {
                    usp.append(k, t);
                }
            } else if (v !== null && v !== undefined) {
                usp.append(k, v);
            }
        }
    }
    return usp.toString();
}

api.interceptors.request.use((config: AxiosRequestConfig) => {
    try {
        config.headers['X-TimeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
        // ignore error
    }
    return config;
});

api.interceptors.response.use((response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            return Promise.reject(error.response);
        } else {
            // probably a network error
            return Promise.reject({ status: 500 })
        }
    });
