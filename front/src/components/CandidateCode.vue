<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child is-4"></article>
            <article class="tile is-child is-4 notification is-warning">
                <h1 class="title">{{ $t("title") }}</h1>
                <h2
                    class="subtitle"
                    v-html="$t('subtitle', { phoneNumber: phoneNumber })"
                />
                <b-field :label="$t('code.label')">
                    <b-input
                        v-model="otp"
                        type="number"
                        pattern="\d*"
                        :placeholder="$t('code.placeholder')"
                    />
                </b-field>
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            @click="doSendCode"
                            :loading="codeValidationLoading"
                            :disabled="codeValidationDisabled"
                            v-hotkey="keymap"
                        >
                            {{ $t("confirm") }}
                        </b-button>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";

@Component<CandidateCode>({})
export default class CandidateCode extends Base {
    @Prop() phoneNumber!: string;
    @Prop() validationId!: string;

    private otp: string | null = null;

    get keymap() {
        return { enter: this.doSendCode };
    }

    private doSendCode() {
        if (!this.codeValidationDisabled) {
            store.dispatch.candidate
                .validate({
                    validationId: this.validationId,
                    otp: this.otp!,
                })
                .then(() => {
                    this.$router.push({
                        name: "confirmCandidate",
                        params: { phoneNumber: this.phoneNumber },
                    });
                });
        }
    }

    get codeValidationDisabled() {
        return (
            this.codeValidationLoading ||
            !this.otp ||
            !/^(\d{4})$/.test(this.otp)
        );
    }

    get codeValidationLoading() {
        return this.inProgress("validateCandidate");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Validation de votre inscription",
        "subtitle": "Merci de saisir le code à 4 chiffres envoyé sur votre téléphone portable {phoneNumber}&nbsp;:",
        "code": {
            "label": "Code de validation",
            "placeholder": "1234"
        },
        "confirm": "Confirmer"
   },
    "en": {
        "title": "Signup validation",
        "subtitle": "Please enter the 4-digit code we sent to your mobile phone {phoneNumber}:",
        "code": {
            "label": "Validation code",
            "placeholder": "1234"
        },
        "confirm": "Confirm"
    }
}
</i18n>
