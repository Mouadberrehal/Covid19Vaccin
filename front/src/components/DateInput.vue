<template>
    <b-datepicker
        v-model="dateValue"
        v-bind="$attrs"
        :date-parser="parseDate"
        :date-formatter="formatDate"
        :editable="true"
        :locale="$i18n.locale"
        :custom-class="
            currentError === undefined ? '' : 'has-background-warning '
        "
        :use-html5-validation="false"
        :placeholder="placeholder"
        @input="onInput"
        @blur="onBlur"
    />
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import Base from "@/components/Base.vue";
import {
    formatIsoDate,
    parseDateAsEpochSeconds,
    getIsoDate,
} from "@/util/datetime";

@Component<DateInput>({
    inheritAttrs: false,
})
export default class DateInput extends Base {
    @Prop({ default: "" }) private placeholder!: string;
    @Prop({ default: "0" }) private tabindex!: string;
    @Prop({ default: false }) private autocomplete!: boolean;
    @Model("modified") private value!: string; // timestamp formatted with locale format

    private dateValue: Date | null = null;

    onBlur() {
        this.onInput(this.dateValue);
    }

    parseDate(d: string): Date | null {
        const seconds = parseDateAsEpochSeconds(this.$i18n.locale, d);
        if (isNaN(seconds)) {
            // not a date
            return null;
        }
        return new Date(seconds * 1000);
    }

    formatDate(d: Date | null): string | null {
        const iso = getIsoDate(d);
        if (!iso) {
            return null;
        } else {
            return formatIsoDate(this.$i18n.locale, iso);
        }
    }

    // return the date as a date in ISO8601 format (YYYY-MM-DD)
    @Emit("modified")
    onInput(value: Date | null | undefined) {
        if (this.id) {
            store.dispatch.api.resetError({ name: this.id });
        }
        this.dateValue = value || null;
        if (!this.dateValue) {
            return null;
        }
        return getIsoDate(this.dateValue);
    }

    @Watch("value")
    valueChange(value: string | null | undefined) {
        // value is in ISO8601 format
        if (!value) {
            this.dateValue = null;
        } else {
            this.dateValue = new Date(
                Date.UTC(
                    +value.substring(0, 4),
                    +value.substring(5, 7) - 1,
                    +value.substring(8, 10)
                )
            );
        }
    }

    mounted() {
        // input string is in ISO8601 format (YYYY-MM-DD): set initial dateValue from input string
        this.valueChange(this.value);
    }
}
</script>
