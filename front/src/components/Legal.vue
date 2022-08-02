<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h1 class="title">{{ $t('title') }}</h1>
                <h1 class="subtitle has-text-weight-semibold mt-6 mb-3">{{ $t('subtitleEditor') }}</h1>
                <div v-html="$t('bodyEditor')"/>
                <h1 class="subtitle has-text-weight-semibold mt-6 mb-3">{{ $t('subtitleHost') }}</h1>
                <div v-html="$t('bodyHost')"/>
                <h1 class="subtitle has-text-weight-normal is-6 mt-6 mb-5">{{ $t('credits') }}</h1>
                <div class="level">
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
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";

@Component<Legal>({})
export default class Legal extends Base {
    get keymap() {
        return { enter: this.home };
    }

    private home() {
        this.$router.push({ name: "main" });
    }
}
</script>


<i18n>
{
    "fr": {
        "title": "Mentions légales",
        "subtitleEditor": "Editeur du site internet",
        "bodyEditor": "<strong>Siège social</strong> : Verso, 46 bd Suchet 75016 Paris<br><strong>SIREN</strong> : 885060673<br><strong>Email</strong> : contact@dernieredose.org",
        "subtitleHost": "Hébergeur du site internet",
        "bodyHost": "<strong>Siège social</strong> : Google Cloud France, 8 rue de Londres 75009 Paris<br><strong>Lieu d'hébergement</strong> : Belgique",
        "credits": "Développement du site internet par Olivier Chédru, Jeremie Bourgeois et Mouad Berrehal.",
        "home": "Retour à l'accueil"
    },
    "en": {
        "title": "Legal mentions",
        "subtitleEditor": "Editeur du site internet",
        "bodyEditor": "<strong>Siège social</strong> : Verso, 46 bd Suchet 75016 Paris<br><strong>SIREN</strong> : 885060673<br><strong>Email</strong> : contact@dernieredose.org",
        "subtitleHost": "Hébergeur du site internet",
        "bodyHost": "<strong>Siège social</strong> : Google Cloud France, 8 rue de Londres 75009 Paris<br><strong>Lieu d'hébergement</strong> : Belgique",
        "credits": "",
        "home": "Back to home"
    }
}
</i18n>
