<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child is-4"></article>
            <article class="tile is-child is-4 notification is-success">
                <h1 class="title" v-html="$t('title')" />
                <h2
                    class="subtitle"
                    v-html="$t('subtitle', { phoneNumber: phoneNumber })"
                />
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-info"
                            @click="vaccinatorLogin"
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

@Component<VaccinatorWelcome>({})
export default class VaccinatorWelcome extends Base {
    @Prop() phoneNumber!: string;

    get keymap() {
        return { enter: this.vaccinatorLogin };
    }

    private vaccinatorLogin() {
        this.$router.push({
            name: "vaccinatorWorkspace",
        });
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Bienvenue sur dernieredose.org&nbsp;!",
        "subtitle": "Votre identifiant de connexion est votre numéro de téléphone portable&nbsp;: {phoneNumber}.",
        "confirm": "Accéder à mon espace"
   },
    "en": {
        "title": "Welcome to dernieredose.org!",
        "subtitle": "Your login id is your mobile phone number: {phoneNumber}.",
        "confirm": "Go to my vaccinator workspace"
    }
}
</i18n>
