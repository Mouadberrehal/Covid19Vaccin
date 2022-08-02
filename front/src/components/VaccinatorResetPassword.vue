<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child is-4"></article>
            <article class="tile is-child is-4 is-vertical box is-info">
                <h1 class="title">
                    {{ $t("title") }}
                </h1>
                <h2 class="subtitle">
                    {{ $t("message", { phoneNumber }) }}
                </h2>
                <b-field :label="$t('newPassword')">
                    <b-input
                        name="new-password"
                        autocomplete="new-password"
                        v-model="newPassword"
                        type="password"
                        :password-reveal="true"
                    />
                </b-field>
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            :disabled="vaccinatorResetPasswordDisabled"
                            :loading="vaccinatorResetPasswordLoading"
                            @click="doVaccinatorResetPassword"
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

@Component<VaccinatorResetPassword>({})
export default class VaccinatorResetPassword extends Base {
    @Prop() phoneNumber!: string;
    @Prop() resetKey!: string;

    private newPassword: string | null = null;

    get keymap() {
        return { enter: this.doVaccinatorResetPassword };
    }

    private doVaccinatorResetPassword() {
        if (!this.vaccinatorResetPasswordDisabled) {
            store.dispatch.vaccinator
                .resetPassword({
                    newPassword: this.newPassword!,
                    key: this.resetKey,
                    msg: this.$t("success").toString(),
                })
                .then(() => {
                    this.$router.push({ name: "vaccinatorWorkspace" });
                });
        }
    }

    get vaccinatorResetPasswordDisabled() {
        return !this.newPassword;
    }

    get vaccinatorResetPasswordLoading() {
        return this.inProgress("resetVaccinatorPassword");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Réinitialisation du mot de passe",
        "message": "Pour réinitialiser le mot de passe de votre compte {phoneNumber}, merci de remplir le champ ci-dessous.",
        "newPassword": "Nouveau mot de passe",
        "confirm": "Réinitialiser le mot de passe",
        "success": "Le mot de passe a été réinitialisé avec succès !"
    },
    "en": {
        "title": "Password reset",
        "message": "To reset the password of your account {phoneNumber}, please fill the field below.",
        "newPassword": "New password",
        "confirm": "Reset password",
        "success": "Your password has been reset successfully!"
    }
}
</i18n>