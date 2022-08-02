import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $goto: (path: string, callback?: () => void) => void;
        $bubble: (event: string, ...args: any[]) => void;
    }
}
