<template>
    <div class="container" style="margin-top: 5em">
        <div class="level">
            <div class="level-item" has-text-centered>
                <b-notification
                    type="is-dark"
                    icon="cloud-question"
                    has-icon
                    :closable="false"
                >
                    <div v-html="$t('message')" />
                </b-notification>
            </div>
        </div>
        <div class="level">
            <div class="level-item">
                <b-button type="is-primary" v-hotkey="keymap" @click="back">
                    {{ $t("back") }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";

@Component<PageNotFound>({
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.fromRoute = from;
        });
    },
})
export default class PageNotFound extends Vue {
    private fromRoute!: Route;

    get keymap() {
        return { enter: this.back };
    }

    back() {
        if (!this.fromRoute.name) {
            this.$router.push({ name: "main" });
        } else {
            this.$router.back();
        }
    }
}
</script>

<i18n>
{
    "fr": {
        "message": "Cette page n'existe pas&nbsp;!",
        "back": "Retour à la page précédente"
    },
    "en": {
        "message": "This page does not exist!",
        "back": "Back"
    }
}
</i18n>
