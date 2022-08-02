<template>
    <div id="app" v-if="!loading">
        <header class="app-header">
            <b-navbar class="is-fixed-top is-transparent">
                <template #brand>
                    <b-navbar-item tag="router-link" :to="{ name: 'main' }">
                        <img src="@/assets/logo.svg" alt="Dernière Dose" />
                        <b-tag v-if="testMode" type="is-danger is-light">
                            test
                        </b-tag>
                        <p
                            class="title is-3 has-text-weight-normal has-text-primary"
                        >
                            DerniereDose.org
                        </p>
                    </b-navbar-item>
                </template>
                <template #start> </template>
                <template #end>
                    <b-navbar-item tag="router-link" :to="{ name: 'faq' }">
                        <button class="button is-info is-inverted">
                            {{ $t("faq") }}
                        </button>
                    </b-navbar-item>
                    <b-navbar-item
                        tag="router-link"
                        :to="{ name: 'supportUs' }"
                    >
                        <button class="button is-info is-inverted">
                            {{ $t("supportUs") }}
                        </button>
                    </b-navbar-item>
                    <b-navbar-item tag="div">
                        <div class="buttons">
                            <b-button
                                class="is-primary is-danger"
                                @click="logout"
                                v-if="inVaccinatorWorkspace"
                            >
                                <strong> {{ $t("logout.label") }} </strong>
                            </b-button>
                            <router-link
                                class="button is-info is-medium"
                                :to="routeToVaccinatorWorkspace"
                                v-if="!inVaccinatorWorkspace"
                            >
                                <strong>
                                    {{ $t("vaccinatorWorkspace") }}
                                </strong>
                            </router-link>
                        </div>
                    </b-navbar-item>
                </template>
            </b-navbar>
        </header>
        <main class="container">
            <div class="tile is-parent mb-6"><!-- PADDING--></div>
            <!-- PADDING-->
            <router-view />
        </main>
        <footer class="footer">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <b-icon class="mr-2" icon="twitter" size="is-small">
                        </b-icon>
                        <a
                            href="https://twitter.com/dernieredose"
                            target="_blank"
                        >
                            Twitter
                        </a>
                    </div>
                    <div class="level-item">
                        <b-icon class="mr-2" icon="email" size="is-small">
                        </b-icon>
                        <a href="mailto: contact@dernieredose.org">
                            contact@dernieredose.org
                        </a>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <router-link class="is-info" :to="{ name: 'legal' }">
                            {{ $t("legalMentions") }}</router-link
                        >
                    </div>
                </div>
            </nav>
        </footer>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Watch } from "vue-property-decorator";
import Base from "@/components/Base.vue";

@Component<App>({})
export default class App extends Base {
    beforeCreate() {
        // retrieve info about logged vaccinator
        store.dispatch.vaccinator.current();
    }

    get testMode() {
        return window.location.host.startsWith("test.");
    }

    get loading() {
        return (
            !store.getters.vaccinator.current &&
            this.inProgress("currentVaccinator")
        );
    }

    get routeToVaccinatorWorkspace() {
        // either login or go directly to vaccinator workspace
        return {
            name:
                store.getters.vaccinator.current === null
                    ? "vaccinatorLogin"
                    : "vaccinatorWorkspace",
        };
    }

    get inVaccinatorWorkspace() {
        return this.$route.name === "vaccinatorWorkspace";
    }

    private logout() {
        store.dispatch.vaccinator
            .logout({ msg: this.$t("logout.success").toString() })
            .then(() => this.$router.push({ name: "main" }));
    }

    @Watch("$route")
    $routeChanged() {
        // clear errors when changing page
        this.clearErrors();
    }
}
</script>

<style lang="scss">
//@import "../../mystyles.scss";

#app {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

//.container {
//    margin-top: 10%;
//}

.footer {
    padding-bottom: 2%;
    padding-top: 2%;
    height: 10%;
}

html,
body {
    /* get rid of vertical scrollbar */
    background: #dfeeff;
    overflow-y: auto;
    overflow-x: hidden;
}

/* remove spinners from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
</style>

<i18n>
{
    "fr": {
        "presentation": "Présentation",
        "faq": "Foire Aux Questions",
        "supportUs": "Nous soutenir",
        "vaccinatorWorkspace": "Espace vaccinateur",
        "logout": {
            "label": "Déconnexion",
            "success": "Déconnexion réussie"
        },
        "legalMentions": "Mentions légales"
    },
    "en": {
        "presentation": "Presentation",
        "faq": "Frequently Asked Questions",
        "supportUs": "Support us",
        "vaccinatorWorkspace": "Vaccinator workspace",
        "logout": {
            "label": "Logout",
            "success": "Logout successful"
        },
        "legalMentions": "Legal mentions"
    }
}
</i18n>