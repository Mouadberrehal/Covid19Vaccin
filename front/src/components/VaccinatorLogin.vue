<template>
    <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile has-text-centered is-hidden-mobile is-child notification is-info is-light is-12">
                        <h1 class="title has-text-weight-normal has-text-link is-4">{{ $t("hasNotAccount") }}</h1>
                    </article>
                    <VaccinatorSignup></VaccinatorSignup>
                </div>
                <article class="tile is-1"></article>
                <div class="tile is-parent is-vertical">
                    <article class="tile has-text-centered is-hidden-mobile is-child notification is-link is-light is-12">
                        <h1 class="title has-text-weight-normal has-text-info is-4">{{ $t("hasAccount") }}</h1>
                    </article>
                        <article class="tile is-child notification box is-white">
                            <h1 class="title has-text-weight-normal mb-6">{{ $t("title") }}</h1>
                            <b-field :label="$t('phoneNumber.label')">
                                <b-input
                                    v-model="phoneNumber"
                                    name="username"
                                    autocomplete="username"
                                    type="tel"
                                    required
                                    :validation-message="$t('mandatory')"
                                    :placeholder="$t('phoneNumber.placeholder')"
                                />
                            </b-field>
                            <b-field :label="$t('password')">
                                <b-input
                                    name="password"
                                    autocomplete="current-password"
                                    v-model="password"
                                    type="password"
                                    required
                                    :validation-message="$t('mandatory')"
                                    :password-reveal="true"
                                />
                            </b-field>
                            <div class="level">
                                <div class="level-item mt-6">
                                    <b-button
                                        type="is-primary"
                                        v-hotkey="keymap"
                                        @click="doVaccinatorLogin"
                                        :loading="vaccinatorLoginLoading"
                                        :disabled="vaccinatorLoginDisabled"
                                    >
                                        {{ $t("connect") }}
                                    </b-button>
                                </div>
                            </div>
                            <div class="level">
                                <div class="level-item mb-5">
                                    <b-button
                                        type="is-danger is-light is-small"
                                        @click="doVaccinatorForgotPassword"
                                    >
                                        {{ $t("forgotPassword.label") }}
                                    </b-button>
                                </div>
                            </div>

                            <h1 v-html="$t('question')" class="title has-text-weight-normal has-text-centered is-6 mt-6 mb-0"></h1>
                        </article>
                </div>
            </div>
            <div class="level mb-5 mt-1">
                <div class="level-item">
                    <b-button
                        type="is-primary"
                        v-hotkey="keymap"
                        @click="home"
                    >
                        {{ $t("home") }}
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";
import VaccinatorSignup from "@/components/VaccinatorSignup.vue";

@Component<VaccinatorLogin>({ components: { VaccinatorSignup } })
export default class VaccinatorLogin extends Base {
    private phoneNumber: string | null = null;
    private password: string | null = null;

    get keymap() {
        return { enter: this.doVaccinatorLogin };
    }

    private home() {
        this.$router.push({ name: "main" });
    }

    private doVaccinatorLogin() {
        if (!this.vaccinatorLoginDisabled) {
            store.dispatch.vaccinator
                .login({
                    phoneNumber: this.phoneNumber!,
                    password: this.password!,
                    msg: this.$t("success").toString(),
                })
                .then((vaccinator) => {
                    const redirect = this.$router.currentRoute.query.redirect;
                    if (redirect) {
                        this.$router.push(redirect.toString());
                    } else {
                        this.$router.push({ name: "vaccinatorWorkspace" });
                    }
                });
        }
    }

    private doVaccinatorForgotPassword() {
        this.$buefy.dialog.prompt({
            message: this.$t("forgotPassword.prompt").toString(),
            inputAttrs: {
                value: this.phoneNumber,
                name: "username",
                type: "tel",
                required: true,
                placeholder: this.$t("phoneNumber.placeholder"),
            },
            cancelText: this.$t("forgotPassword.cancel").toString(),
            confirmText: this.$t("forgotPassword.confirm").toString(),
            type: "is-info",
            hasIcon: true,
            icon: "lock-open",
            animation: "",
            onConfirm: (phoneNumber) => {
                this.phoneNumber = phoneNumber;
                store.dispatch.api.clearErrors();
                const url = window.location.origin + "/reinit-mot-de-passe";
                const msg = this.$t("forgotPassword.success", {
                    phoneNumber: phoneNumber,
                }).toString();
                store.dispatch.vaccinator.triggerPasswordReset({
                    url,
                    phoneNumber,
                    msg,
                });
            },
        });
    }

    get vaccinatorLoginDisabled() {
        return !this.phoneNumber || !this.password;
    }

    get vaccinatorLoginLoading() {
        return this.inProgress("loginVaccinator");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Connexion à votre espace vaccinateur",
		"home": "Retour à l'accueil",
        "phoneNumber": {
            "label": "Numéro de téléphone portable",
            "placeholder": "0612345678"
        },
        "question": "Des questions ? Rendez-vous dans la <a class='has-text-link' href='/faq'>FAQ</a> ou si certaines de vos interrogations restent sans réponses, contactez nous par mail à <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>",
        "hasAccount": "Vous avez déjà un compte ?",
        "hasNotAccount": "Vous n'avez pas encore de compte ?",
        "password": "Mot de passe",
        "connect": "Connexion",
        "success": "Bienvenue dans votre espace vaccinateur !",
        "forgotPassword": {
            "label": "J'ai oublié mon mot de passe",
            "prompt": "Merci de renseigner votre numéro de téléphone portable ci-dessous et nous vous enverrons un SMS avec le lien de réinitialisation du mot de passe.",
            "confirm": "Confirmer",
            "cancel": "Annuler",
            "success": "SMS envoyé à {phoneNumber} !"
        }
    },
    "en": {
        "title": "Connect to your vaccinator workspace",
        "home": "Back to home",
        "phoneNumber": {
            "label": "Mobile phone number",
            "placeholder": "0612345678"
        },
        "question": "Questions? Check out the <a class='has-text-link' href='/faq'>FAQ</a> or if some of your questions have no answer, contact us by email at <a class='has-text-link' href='mailto:contact@dernieredose.org'>contact@dernieredose.org</a>",
        "hasAccount": "Already have an account?",
        "hasNotAccount": "No account yet?",
        "password": "Password",
        "connect": "Connection",
        "success": "Welcome to your vaccinator workspace!",
        "forgotPassword": {
            "label": "I forgot my password",
            "prompt": "Please enter your mobile phone number below and we will send you a SMS with a password reset link.",
            "confirm": "Confirm",
            "cancel": "Cancel",
            "success": "SMS sent to {phoneNumber}!"
        }
    }
}
</i18n>
