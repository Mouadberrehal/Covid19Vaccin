<template>
    <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
            <div class="tile">
                <div class="tile is-parent is-vertical is-3" />
                <div class="tile is-parent is-vertical is-6">
                    <article class="tile is-child notification box is-white">
                        <h1 class="title has-text-weight-normal mb-6">
                            {{ $t("title") }}
                        </h1>
                        <b-field :label="$t('email.label')">
                            <b-input
                                v-model="email"
                                name="username"
                                autocomplete="username"
                                type="email"
                                required
                                :validation-message="$t('mandatory')"
                                :placeholder="$t('email.placeholder')"
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
                                    @click="doAdminLogin"
                                    :loading="adminLoginLoading"
                                    :disabled="adminLoginDisabled"
                                >
                                    {{ $t("connect") }}
                                </b-button>
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-item mb-5">
                                <b-button
                                    type="is-danger is-light is-small"
                                    @click="doAdminForgotPassword"
                                >
                                    {{ $t("forgotPassword.label") }}
                                </b-button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="level mb-5 mt-1">
                <div class="level-item">
                    <b-button type="is-primary" v-hotkey="keymap" @click="home">
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

@Component<AdminLogin>({ components: {} })
export default class AdminLogin extends Base {
    private email: string | null = null;
    private password: string | null = null;

    get keymap() {
        return { enter: this.doAdminLogin };
    }

    private home() {
        this.$router.push({ name: "main" });
    }

    private doAdminLogin() {
        if (!this.adminLoginDisabled) {
            store.dispatch.admin
                .login({
                    email: this.email!,
                    password: this.password!,
                    msg: this.$t("success").toString(),
                })
                .then((admin) => {
                    const redirect = this.$router.currentRoute.query.redirect;
                    if (redirect) {
                        this.$router.push(redirect.toString());
                    } else {
                        this.$router.push({ name: "adminWorkspace" });
                    }
                });
        }
    }

    private doAdminForgotPassword() {
        this.$buefy.dialog.prompt({
            message: this.$t("forgotPassword.prompt").toString(),
            inputAttrs: {
                value: this.email,
                name: "username",
                type: "tel",
                required: true,
                placeholder: this.$t("email.placeholder"),
            },
            cancelText: this.$t("forgotPassword.cancel").toString(),
            confirmText: this.$t("forgotPassword.confirm").toString(),
            type: "is-info",
            hasIcon: true,
            icon: "lock-open",
            animation: "",
            onConfirm: (email) => {
                this.email = email;
                store.dispatch.api.clearErrors();
                const url =
                    window.location.origin +
                    "/reinit-mot-de-passe-administrateur";
                const msg = this.$t("forgotPassword.success", {
                    email: email,
                }).toString();
                store.dispatch.admin.triggerPasswordReset({
                    url,
                    email,
                    msg,
                });
            },
        });
    }

    get adminLoginDisabled() {
        return !this.email || !this.password;
    }

    get adminLoginLoading() {
        return this.inProgress("loginAdmin");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Connexion administrateur",
		"home": "Retour à l'accueil",
        "email": {"label": "Adresse email", "placeholder": "moi@dernieredose.org"},
        "password": "Mot de passe",
        "connect": "Connexion",
        "success": "Bienvenue dans votre espace administrateur !",
        "forgotPassword": {
            "label": "J'ai oublié mon mot de passe",
            "prompt": "Merci de renseigner votre adresse email et nous vous enverrons un message avec le lien de réinitialisation du mot de passe.",
            "confirm": "Confirmer",
            "cancel": "Annuler",
            "success": "Email envoyé à {email} !"
        }
    },
    "en": {
        "title": "Connect as administrator",
        "email": {"label":"Email address", "placeholder": "me@dernieredose.org"},
        "password": "Password",
        "connect": "Connection",
        "success": "Welcome to your administrator workspace!",
        "forgotPassword": {
            "label": "I forgot my password",
            "prompt": "Please enter your email address below and we will send you a message with a password reset link.",
            "confirm": "Confirm",
            "cancel": "Cancel",
            "success": "Email sent to {email}!"
        }
    }
}
</i18n>
