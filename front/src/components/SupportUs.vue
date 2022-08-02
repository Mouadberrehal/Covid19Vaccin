<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box has-text-centered">
                <h1 class="title is-2 mt-4"> {{ $t('title') }} </h1>
					<span class="subtitle is-4"> {{$t('body')}} </span>
					<p class="mb-6">
						<span class="subtitle is-4" v-html="$t('body2')"/>
					</p>
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

@Component<SupportUs>({})
export default class SupportUs extends Base {
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
        "title": "Nous soutenir",
        "body": "dernieredose.org est un projet conçu par des citoyens qui mettent leurs compétences au service d'une plus grande efficacité de la vaccination contre la covid-19.",
		"body2": "Pour soutenir notre initiative,<strong> parlez en autour de vous !</strong>",
        "home": "Retour à l'accueil"
    },
    "en": {
        "title": "Support us",
        "body": "You can put some <strong>html</strong> here.",
        "home": "Back to home"
    }
}
</i18n>
