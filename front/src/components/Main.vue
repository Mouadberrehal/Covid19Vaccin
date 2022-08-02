<template>
    <div id="allIn" class="tile is-ancestor">
        <div class="tile is-vertical">
            <div class="tile is-parent has-text-centered is-12">
                <article id="titre" class="tile is-child is-shadowless box">
                    <h1
                        class="title is-3 has-text-weight-normal"
                        v-html="$t('title')"
                    />
                </article>
            </div>
            <div class="tile mb-5 mt-1 box is-shadowless">
                <div class="tile is-parent is-vertical">
                    <article id="candidat" class="tile is-child box is-link">
                        <h1
                            class="title has-text-weight-normal has-text-link"
                            v-html="$t('candidate.title')"
                        />
                        <h2
                            class="subtitle has-text-link"
                            v-html="$t('candidate.subtitle')"
                        />
                        <b-field :label="$t('candidate.phoneNumber.label')">
                            <b-input
                                v-model="phoneNumber"
                                type="tel"
                                required
                                :validation-message="$t('mandatory')"
                                :placeholder="
                                    $t('candidate.phoneNumber.placeholder')
                                "
                            />
                        </b-field>
                        <b-field :label="$t('candidate.postcode.label')">
                            <b-input
                                v-model="postcode"
                                type="number"
                                pattern="\d*"
                                required
                                :validation-message="$t('mandatory')"
                                :placeholder="
                                    $t('candidate.postcode.placeholder')
                                "
                            />
                        </b-field>
                        <b-field
                            :label="$t('candidate.birthdate.label')"
                            v-bind="birthdateFieldProps"
                        >
                            <DateInput
                                :placeholder="
                                    $t('candidate.birthdate.placeholder')
                                "
                                required
                                :validation-message="$t('mandatory')"
                                v-model="birthdate"
                            />
                        </b-field>
                        <div class="level">
                            <div class="level-item">
                                <b-button
                                    type="is-link is-medium"
                                    @click="doCandidateSignup"
                                    :loading="candidateSignupLoading"
                                    :disabled="candidateSignupDisabled"
                                >
                                    {{ $t("candidate.confirm") }}
                                </b-button>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent is-vcentered has-text-centered">
                    <article class="tile is-vertical is-child">
                        <h1
                            class="title has-text-weight-light"
                            v-html="$t('candidate.tagline')"
                        />
                        <div class="level-center">
                            <div class="level-item">
                                <router-link
                                    class="is-info"
                                    :to="{ name: 'faq' }"
                                >
                                    {{ $t("candidate.moreInfo") }}
                                </router-link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="tile mb-5 mt-5">
                <div class="tile is-parent has-text-centered">
                    <article class="tile is-child is-child">
                        <figure class="image is-inline-block">
                            <img src="@/assets/vaccinator.png" />
                        </figure>
                    </article>
                </div>
                <div class="tile is-parent has-text-centered mb-6">
                    <article id="vaccinator" class="tile is-child box">
                        <h1
                            class="title has-text-weight-normal has-text-info mt-2"
                            v-html="$t('vaccinator.title')"
                        />
                        <h2
                            class="subtitle has-text-info mt-3"
                            v-html="vaccinatorSubtitle"
                        />

                        <b-button
                            v-if="vaccinatorButtonInscription"
                            class="is-hidden-mobile"
                            type="is-info is-medium mt-4 mr-6"
                            @click="doVaccinatorInscription"
                        >
                            {{ $t("vaccinator.inscription") }}
                        </b-button>

                        <b-button
                            type="is-info is-medium mt-4"
                            @click="doVaccinatorStuff"
                        >
                            {{ vaccinatorButtonLabel }}
                        </b-button>

                        <h2
                            class="subtitle has-text-info mt-5"
                            v-html="vaccinatorPatientPriority"
                        />
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";
import DateInput from "@/components/DateInput.vue";

@Component<Main>({ components: { DateInput } })
export default class Main extends Base {
    private phoneNumber: string | null = null;
    private birthdate: string | null = "";
    private postcode: string | null = null;

    get birthdateFieldProps() {
        const failed = this.birthdate === null;
        return {
            type: failed ? "is-danger" : null,
            message: failed ? this.$t("mandatory") : null,
        };
    }

    private doCandidateSignup() {
        if (!this.candidateSignupDisabled) {
            store.dispatch.candidate
                .create({
                    phoneNumber: this.phoneNumber!,
                    postcode: this.postcode!,
                    birthdate: this.birthdate!,
                })
                .then((validationId) => {
                    if (validationId.startsWith("00000000-0000-0000-0000-")) {
                        // degraded mode: bypass OTP verification
                        store.dispatch.candidate
                            .validate({
                                validationId: validationId,
                                otp: "9999",
                            })
                            .then(() => {
                                this.$router.push({
                                    name: "confirmCandidate",
                                    params: { phoneNumber: this.phoneNumber! },
                                });
                            });
                    } else {
                        this.$router.push({
                            name: "validateCandidate",
                            params: {
                                phoneNumber: this.phoneNumber!,
                                validationId: validationId,
                            },
                        });
                    }
                });
        }
    }

    get candidateSignupDisabled() {
        return (
            this.candidateSignupLoading ||
            !this.phoneNumber ||
            !this.postcode ||
            !this.birthdate ||
            !/^\d{5}$/.test(this.postcode)
        );
    }

    get candidateSignupLoading() {
        return this.inProgress("createCandidate");
    }

    get vaccinatorSubtitle() {
        if (store.getters.vaccinator.current) {
            return this.$t("vaccinator.subtitleAlreadyConnected");
        } else {
            return this.$t("vaccinator.subtitle");
        }
    }

    get vaccinatorPatientPriority() {
        if (!store.getters.vaccinator.current) {
            return this.$t("vaccinator.priority");
        }
    }

    get vaccinatorButtonInscription() {
        if (store.getters.vaccinator.current) {
            return false;
        } else {
            return true;
        }
    }

    get vaccinatorButtonLabel() {
        if (store.getters.vaccinator.current) {
            return this.$t("vaccinator.confirmAlreadyConnected");
        } else {
            return this.$t("vaccinator.confirm");
        }
    }

    private doVaccinatorInscription() {
        this.$router.push({
            name: "vaccinatorSignup",
        });
    }

    private doVaccinatorStuff() {
        if (store.getters.vaccinator.current) {
            this.$router.push({
                name: "vaccinatorWorkspace",
            });
        } else {
            this.$router.push({
                name: "vaccinatorSignup",
            });
        }
    }
}
</script>

<style lang="scss">
.tile.is-vcentered {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

#vaccinator {
    background-color: #a4effc;
}

#candidat {
    background-color: #c8caff;
}

#titre {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #dfeeff;
}
</style>

<i18n>
{
    "fr": {
        "title": "La <span class=\"has-text-info-dark\">vaccination</span> pour tous <span class=\"has-text-info-dark\">sans perte</span> de dose",
        "candidate": {
            "title": "Vous êtes candidat à la vaccination",
            "subtitle": "Inscrivez-vous pour recevoir des propositions de dose",
            "phoneNumber": {
                "label": "Numéro de téléphone portable*",
                "placeholder": "0612345678"
            },
            "postcode": {
                "label": "Votre code postal*",
                "placeholder": "12345"
            },
            "birthdate": {"label": "Votre date de naissance*", "placeholder": "Entrer ou sélectionner une date" },
            "confirm": "Je m'inscris",
            "tagline": "Soyez informé automatiquement quand une dose est disponible près de chez vous",
            "moreInfo": "Plus d'informations ici"
        },
        "vaccinator": {
            "title": "Vous êtes vaccinateur avec des doses disponibles&nbsp;?",
            "subtitle": "Inscrivez-vous dès maintenant, déclarez vos doses, dernieredose.org contacte les candidats pour vous&nbsp;!",
            "confirm": "Déclarer des doses",
            "subtitleAlreadyConnected": "Vous êtes déjà connecté. Vous pouvez accéder à votre espace.",
            "confirmAlreadyConnected": "Espace vaccinateur",
            "inscription": "Je m'inscris",
            "priority": "Pour tous les candidats à proximité ou pour mes patients en priorité"

        }
    },
    "en": {
        "title": "<span class=\"has-text-info-dark\">Vaccination</span> for everyone <span class=\"has-text-info-dark\">without wasting</span> doses",
        "candidate": {
            "title": "You are a candidate",
            "subtitle": "Sign up to receive proposals for a dose.",
            "phoneNumber": {
                "label": "Mobile phone number*",
                "placeholder": "0612345678"
            },
            "postcode": {
                "label": "Your postcode*",
                "placeholder": "12345"
            },
            "birthdate": {"label": "Your birthdate*", "placeholder": "Type or select a date" },
            "confirm": "I sign up",
            "tagline": "Get informed automatically when a dose is available near you",
            "moreInfo": "More information here"
        },
        "vaccinator": {
            "title": "You are a vaccinator with available doses?",
            "subtitle": "Sign up now, declare your doses, dernieredose.org notifies nearby candidates for you!",
            "confirm": "I sign up",
            "subtitleAlreadyConnected": "You are already connected. You can access your workspace.",
            "confirmAlreadyConnected": "Vaccinator workspace",
            "inscription": "I sign up",
            "priority": "For all or just for my patients"
        }
    }
}
</i18n>
