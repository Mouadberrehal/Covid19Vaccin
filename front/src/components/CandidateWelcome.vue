<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child is-4"></article>
            <article class="tile is-child is-4 notification is-success">
                <h1 class="title">{{ $t("title") }}</h1>
                <h2 class="subtitle" v-html="$t('subtitle', { phoneNumber: phoneNumber })" />
                <div class="level">
                    <div class="level-item">
                        <b-button type="is-info" @click="returnToMain" v-hotkey="keymap">
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

@Component<CandidateWelcome>({})
export default class CandidateWelcome extends Base {
    @Prop() phoneNumber!: string;

    get keymap() {
        return { enter: this.returnToMain };
    }

    private returnToMain() {
        this.$router.push({
            name: "main",
        });
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Confirmation de votre inscription",
        "subtitle": "Vous êtes bien inscrit à dernieredose.org!<br>Vous serez notifié par SMS par le numéro {phoneNumber} (utilisé pour la validation de votre inscription) dès qu'une dose est disponible dans votre secteur, merci d'y répondre au plus vite afin de rester dans la liste prioritaire.<br>Pour vous désinscrire, envoyez STOP au 0755536248.",
        "confirm": "D'accord"
   },
    "en": {
        "title": "Signup confirmation",
        "subtitle": "You have registered on dernieredose.org<br>You will get a notification on your mobile phone {phoneNumber} as soon as a dose is available in your area, please answer it to stay in the priority list.<br>To unsubscribe, answer STOP.",
        "confirm": "OK"
    }
}
</i18n>
