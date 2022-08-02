<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h1 class="title">{{ $t("title") }}</h1>
                <div v-html="$t('body')" />
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

@Component<Presentation>({})
export default class Presentation extends Base {
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
        "title": "Présentation du service",
        "body": "Le contenu peut être en <strong>html</strong>.",
        "home": "Retour à l'accueil"
    },
    "en": {
        "title": "Service presentation",
        "body": "You can put some <strong>html</strong> here.",
        "home": "Back to home"
    }
}
</i18n>
