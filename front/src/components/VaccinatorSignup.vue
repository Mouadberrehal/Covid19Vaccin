<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article
                class="tile is-child is-vertical notification box is-white"
            >
                <h1 class="title has-text-weight-normal">{{ $t("title") }}</h1>
                <b-field :label="$t('name.label')">
                    <b-input
                        v-model="name"
                        name="name"
                        required
                        :validation-message="$t('mandatory')"
                        :placeholder="$t('name.placeholder')"
                    />
                </b-field>
                <b-field :label="$t('phoneNumber.label')">
                    <b-input
                        class="tile"
                        v-model="phoneNumber"
                        name="username"
                        autocomplete="username"
                        type="tel"
                        required
                        :validation-message="$t('mandatory')"
                        :placeholder="$t('phoneNumber.placeholder')"
                    />
                    <b-tooltip class="is-12 is-hidden-mobile" :label="$t('tooltipPhone')" position="is-bottom" size="is-small" multilined>
                        <b-icon class="ml-1 box has-background-link-light is-shadowless" icon="help" size="is-small"></b-icon>
                    </b-tooltip>
                    <b-tooltip class="is-12 is-hidden-desktop" :label="$t('tooltipPhone')" position="is-left" size="is-small" multilined>
                        <b-icon class="ml-1 box has-background-link-light is-shadowless" icon="help" size="is-small"></b-icon>
                    </b-tooltip>
                </b-field>
                <b-field :label="$t('password.label')">
                    <b-input
                        name="password"
                        autocomplete="new-password"
                        v-model="password"
                        type="password"
                        required
                        :validation-message="$t('mandatory')"
                        :password-reveal="true"
                    />
                </b-field>
                <b-field :label="$t('landlineNumber.label')">
                    <b-input
                        class="tile"
                        v-model="landlineNumber"
                        type="tel"
                        :placeholder="$t('landlineNumber.placeholder')"
                    />
                    <b-tooltip class="is-12 is-hidden-mobile" :label="$t('tooltipFix')" position="is-bottom" size="is-small" multilined>
                        <b-icon class="ml-1 box has-background-link-light is-shadowless" icon="help" size="is-small"></b-icon>
                    </b-tooltip>
                    <b-tooltip class="is-12 is-hidden-desktop" :label="$t('tooltipFix')" position="is-left" size="is-small" multilined>
                        <b-icon class="ml-1 box has-background-link-light is-shadowless" icon="help" size="is-small"></b-icon>
                    </b-tooltip>
                </b-field>
                <b-field :label="$t('address.label')">
                    <b-input
                        v-model="address"
                        required
                        :validation-message="$t('mandatory')"
                        :placeholder="$t('address.placeholder')"
                    />
                </b-field>
                <b-field :label="$t('siret.label')">
                    <b-input
                        v-model="siret"
                        type="number"
                        pattern="\d*"
                        :placeholder="$t('siret.placeholder')"
                    />
                </b-field>
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            v-hotkey="keymap"
                            @click="doVaccinatorSignup"
                            :loading="vaccinatorSignupLoading"
                            :disabled="vaccinatorSignupDisabled"
                        >
                            {{ $t("confirm") }}
                        </b-button>
                    </div>
                </div>
                <h1 v-html="$t('priority')" class="title has-text-weight-normal has-text-centered is-6 mt-5 mb-0"></h1>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";

@Component<VaccinatorSignup>({})
export default class VaccinatorSignup extends Base {
    private name: string | null = null;
    private phoneNumber: string | null = null;
    private landlineNumber: string | null = null;
    private address: string | null = null;
    private siret: string | null = null;
    private password: string | null = null;

    get keymap() {
        return { enter: this.doVaccinatorSignup };
    }

    private doVaccinatorSignup() {
        if (!this.vaccinatorSignupDisabled) {
            store.dispatch.vaccinator
                .create({
                    name: this.name!,
                    phoneNumber: this.phoneNumber!,
                    password: this.password!,
                    landlineNumber: this.landlineNumber,
                    address: this.address!,
                    siret: this.siret!,
                })
                .then((validationId) => {
                    if (validationId.startsWith("00000000-0000-0000-0000-")) {
                        // degraded mode: bypass OTP verification
                        store.dispatch.vaccinator
                            .validate({
                                validationId: validationId,
                                otp: "9999",
                            })
                            .then(() => {
                                this.$router.push({
                                    name: "confirmVaccinator",
                                    params: { phoneNumber: this.phoneNumber! },
                                });
                            });
                    } else {
                        this.$router.push({
                            name: "validateVaccinator",
                            params: {
                                phoneNumber: this.phoneNumber!,
                                validationId: validationId,
                            },
                        });
                    }
                });
        }
    }

    get vaccinatorSignupDisabled() {
        return (
            this.vaccinatorSignupLoading ||
            !this.name ||
            !this.password ||
            !this.phoneNumber ||
            !this.address ||
            !this.siret ||
            (!/^(\d{9})$/.test(this.siret) && !/^(\d{14})$/.test(this.siret))
        );
    }

    get vaccinatorSignupLoading() {
        return this.inProgress("createVaccinator");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Inscription vaccinateur",
        "name": {
            "label": "Nom*",
            "placeholder": "Votre nom ou le nom de votre établissement"
        },
        "phoneNumber": {
            "label": "Numéro de téléphone portable*",
            "placeholder": "0612345678"
        },
        "landlineNumber": {
            "label": "Numéro de téléphone fixe",
            "placeholder": "0112345678"
        },
        "address": {
            "label": "Adresse postale*",
            "placeholder": "Votre adresse postale"
        },
        "siret": {
            "label": "SIRET*",
            "placeholder": "Votre numéro de SIRET (ou SIREN)"
        },
        "password": {
            "label": "Mot de passe*"
        },
        "confirm": "Confirmer",
        "tooltipPhone": "Le numéro de téléphone portable est utilisé pour confirmer votre inscription de manière sécurisée.",
        "tooltipFix": "Si non renseigné, c'est votre numero de téléphone portable qui sera communiqué au candidat.",
        "priority": "Pour que <a class='has-text-link' href='/'>dernieredose.org</a> contacte vos patients en priorité, envoyer la liste de vos patients (uniquement les numéros de mobile) à <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>. Pour tout complément d'information : <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>."
    },
    "en": {
        "title": "Vaccinator signup",
        "name": {
            "label": "Name*",
            "placeholder": "Your name"
        },
        "phoneNumber": {
            "label": "Mobile phone number*",
            "placeholder": "0612345678"
        },
        "landlineNumber": {
            "label": "Landline number",
            "placeholder": "0112345678"
        },
        "address": {
            "label": "Postal address*",
            "placeholder": "Your postal address"
        },
        "siret": {
            "label": "SIRET*",
            "placeholder": "Your SIRET number (or SIREN)"
        },
        "password": {
            "label": "Password*"
        },
        "confirm": "Confirm",
        "tooltipPhone": "Le numéro de téléphone portable est utilisé pour confirmer votre inscription de manière sécurisée.",
        "tooltipFix": "Si non renseigné, c'est votre numero de téléphone portable qui sera communiqué au candidat.",
        "priority": "Pour que <a class='has-text-link' href='/'>dernieredose.org</a> contacte vos patients en priorité, envoyer la liste de vos patients (uniquement les numéros de mobile) à <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>. Pour tout complément d'information : <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>."
    }
}
</i18n>
