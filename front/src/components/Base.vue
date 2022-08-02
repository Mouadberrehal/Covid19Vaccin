<script lang="ts">
import store from "@/store";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Base extends Vue {
    @Prop() protected id?: string;

    protected applyToChildren(f: (component: Base) => void) {
        Base.applyToChildren(this.$children, f);
    }

    protected static applyToChildren(
        children: Vue[],
        f: (component: Base) => void
    ) {
        children.forEach((component) => {
            if (component instanceof Base) {
                f(component);
            }
            Base.applyToChildren(component.$children, f);
        });
    }

    // reset errored status on all children
    protected resetAllErrors() {
        const ids = [] as string[];
        this.applyToChildren((component) => {
            if (component.id) {
                ids.push(component.id);
            }
        });
        store.dispatch.api.resetError({ name: ids });
    }

    protected inProgress(name: string): boolean | undefined {
        return store.getters.api.inProgress(name);
    }

    protected get currentError() {
        return this.id ? store.getters.api.error(this.id) : undefined;
    }

    // send an 'errored' event to all parents when this element is in error
    @Watch("currentError")
    currentErrorChange(error: string | undefined) {
        if (error) {
            this.$bubble("errored", { id: this.id, error: error });
        }
    }

    protected findChildById(id: string): Base | null {
        const result = [] as Base[];
        this.applyToChildren(component => {
            if (component.id === id) {
                result.push(component);
            }
        });
        return result.length === 1 ? result[0] : null;
    }

    mounted() {
        this.$on("errored", this.onErrored);
    }

    protected onErrored(e: { id: string; error: string }) {
        // do nothing
    }

    protected clearErrors(): Promise<void> {
        return store.dispatch.api.clearErrors();
    }

}
</script>
