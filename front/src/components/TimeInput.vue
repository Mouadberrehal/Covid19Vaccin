<template>
    <b-timepicker
        v-model="dateValue"
        v-bind="$attrs"
        :datetime-parser="parseTimestamp"
        :datetime-formatter="formatTimestamp"
        :editable="true"
        :locale="$i18n.locale"
        :custom-class="
            currentError === undefined ? '' : 'has-background-warning '
        "
        :use-html5-validation="false"
        :placeholder="placeholder"
        @input="onInput"
    />
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import Base from "@/components/Base.vue";
import {
    parseTimestampAsEpochSeconds,
    formatIsoTimestamp,
} from "@/util/datetime";

@Component<TimeInput>({
    inheritAttrs: false,
})
export default class TimeInput extends Base {
    @Prop({ default: "" }) private placeholder!: string;
    @Prop({ default: "0" }) private tabindex!: string;
    @Prop({ default: false }) private autocomplete!: boolean;
    @Model("modified") private value!: string; // timestamp formatted with locale format

    private dateValue: Date | null = null;

    parseTimestamp(t: string): Date | null {
        const seconds = parseTimestampAsEpochSeconds(this.$i18n.locale, t);
        if (isNaN(seconds)) {
            // not a timestamp
            return null;
        }
        return new Date(seconds * 1000);
    }

    formatTimestamp(d: Date | null): string | null {
        if (!d) {
            return null;
        } else {
            return formatIsoTimestamp(this.$i18n.locale, d.toISOString());
        }
    }

    // return the timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    @Emit("modified")
    onInput(value: Date | null | undefined) {
        if (this.id) {
            store.dispatch.api.resetError({ name: this.id });
        }
        this.dateValue = value || null;
        return this.dateValue?.toISOString();
    }

    @Watch("value")
    valueChange(value: string | null | undefined) {
        // value is in ISO8601 format
        if (!value) {
            this.dateValue = null;
        } else {
            this.dateValue = new Date(value);
        }
    }

    mounted() {
        // input string is in ISO8601 format (YYYY-MM-DDTHH:mm:ss.sssZ): set initial dateValue from input string
        this.valueChange(this.value);
    }
}
</script>
