<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <article class="tile is-child box">
                <h1 class="title">{{ name }}</h1>
                <h2 class="subtitle" v-html="$t('subtitle')" />
                <b-notification
                    v-bind="geocodingNotificationProps"
                    v-html="geocodingNotificationText"
                />
                <div class="card" v-for="dose in doses" :key="dose.id">
                    <div class="card-content">
                        <div class="content" v-html="doseDescription(dose)" />
                        <p
                            class="subtitle is-6"
                            v-html="doseCandidatesDescription(dose)"
                        />
                        <b-taglist v-if="dose.candidates">
                            <b-tag
                                type="is-info is-light"
                                size="is-medium"
                                v-for="candidate in dose.candidates"
                                :key="candidate.phoneNumber"
                                v-html="doseCandidateDescription(candidate)"
                            />
                        </b-taglist>
                    </div>
                </div>
                <div class="level" />
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            :disabled="newDoseDisabled"
                            @click="doShowNewDose"
                        >
                            {{ $t("newDose") }}
                        </b-button>
                    </div>
                </div>
            </article>
            <!--
                Modal box: new dose
            -->
            <b-modal
                v-model="showNewDose"
                :has-modal-card="true"
                :can-cancel="['escape', 'outside', 'button']"
            >
                <template>
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">
                                {{ $t("dose.title") }}
                            </p>
                        </header>
                        <section class="modal-card-body">
                            <b-field :label="$t('dose.day')">
                                <DateInput
                                    v-model="doseDate"
                                    horizontal-time-picker
                                    :append-to-body="true"
                                    :min-datetime="new Date()"
                                />
                            </b-field>
                            <b-field :label="$t('dose.start')">
                                <TimeInput
                                    v-model="doseStart"
                                    :append-to-body="true"
                                    :min-datetime="new Date()"
                                />
                            </b-field>
                            <b-field :label="$t('dose.end')">
                                <TimeInput
                                    v-model="doseEnd"
                                    :append-to-body="true"
                                    :min-datetime="new Date()"
                                />
                            </b-field>
                            <b-field :label="$t('dose.count')">
                                <b-input
                                    v-model="doseCount"
                                    type="number"
                                    pattern="\d*"
                                    required
                                    :validation-message="$t('mandatory')"
                                />
                            </b-field>
                            <b-field :label="$t('dose.name')">
                                <b-select v-model="doseName">
                                    <option
                                        v-for="option in $t('dose.nameOptions')"
                                        :value="option"
                                        :key="option"
                                    >
                                        {{ option }}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field :label="$t('dose.minAge')">
                                <b-input v-model="doseMminAge" type="number" />
                            </b-field>
                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                :label="$t('dose.confirm')"
                                @click="doCreateDose"
                                type="is-primary"
                                v-hotkey="doseKeymap"
                                :loading="doseCreationLoading"
                                :disabled="doseCreationDisabled"
                            />
                            <b-button
                                :label="$t('dose.cancel')"
                                @click="showNewDose = false"
                            />
                        </footer>
                    </div>
                </template>
            </b-modal>
            <article class="tile is-child box">
                <h2 class="subtitle" v-html="$t('info')" />
                <b-field :label="$t('name.label')">
                    <b-input
                        v-model="name"
                        :placeholder="$t('name.placeholder')"
                    />
                </b-field>
                <b-field :label="$t('phoneNumber.label')">
                    <b-input
                        v-model="phoneNumber"
                        name="username"
                        type="tel"
                        required
                        :validation-message="$t('mandatory')"
                        :placeholder="$t('phoneNumber.placeholder')"
                    />
                </b-field>
                <b-field :label="$t('landlineNumber.label')">
                    <b-input
                        v-model="landlineNumber"
                        type="tel"
                        :use-html5-validation="false"
                        :placeholder="$t('landlineNumber.placeholder')"
                    />
                </b-field>
                <b-field
                    :label="$t('address.label')"
                    v-bind="addressFieldProps"
                >
                    <b-input
                        v-model="address"
                        required
                        :validation-message="$t('mandatory')"
                        :placeholder="$t('address.placeholder')"
                    />
                </b-field>
                <b-field :label="$t('siret.label')">
                    <b-input
                        v-model="siret"
                        type="number"
                        pattern="\d*"
                        :placeholder="$t('siret.placeholder')"
                    />
                </b-field>
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            @click="doVaccinatorUpdate"
                            :loading="vaccinatorUpdateLoading"
                            :disabled="vaccinatorUpdateDisabled"
                        >
                            {{ $t("update") }}
                        </b-button>
                    </div>
                </div>
            </article>
            <article class="tile is-child box">
                <h2 class="subtitle" v-html="$t('passwordInfo')" />
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            @click="doShowUpdatePassword"
                        >
                            {{ $t("changePassword") }}
                        </b-button>
                    </div>
                </div>
                <!--
                    Modal box: update password
                -->
                <b-modal
                    v-model="showUpdatePassword"
                    :has-modal-card="true"
                    :can-cancel="['escape', 'outside']"
                >
                    <template>
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                <p class="modal-card-title">
                                    {{ $t("changePassword") }}
                                </p>
                            </header>
                            <section class="modal-card-body">
                                <b-field :label="$t('currentPassword')">
                                    <b-input
                                        name="password"
                                        autocomplete="current-password"
                                        v-model="password"
                                        type="password"
                                        :password-reveal="true"
                                    />
                                </b-field>
                                <b-field :label="$t('newPassword')">
                                    <b-input
                                        name="new-password"
                                        autocomplete="new-password"
                                        v-model="newPassword"
                                        type="password"
                                        :password-reveal="true"
                                    />
                                </b-field>
                            </section>
                            <footer class="modal-card-foot">
                                <b-button
                                    :label="$t('confirm')"
                                    @click="doUpdatePassword"
                                    v-hotkey="passwordKeymap"
                                    type="is-primary"
                                    :loading="passwordUpdateLoading"
                                    :disabled="passwordUpdateDisabled"
                                />
                                <b-button
                                    :label="$t('cancel')"
                                    @click="showUpdatePassword = false"
                                />
                            </footer>
                        </div>
                    </template>
                </b-modal>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";
import DateInput from "@/components/DateInput.vue";
import TimeInput from "@/components/TimeInput.vue";
import {
    Geocoding,
    VaccinatorDose,
    VaccinatorDoseCandidate,
    VaccinatorDoseCreation,
} from "@/api/vaccinator";
import { formatIsoDate, getIsoDate, formatIsoTime, replaceTimestamp } from "@/util/datetime";

@Component<VaccinatorWorkspace>({ components: { DateInput, TimeInput } })
export default class VaccinatorWorkspace extends Base {
    private doses: Readonly<Array<VaccinatorDose>> | null = null;

    private showNewDose = false;
    private doseName: string | null = null;
    private doseMminAge: number | null = null;
    private doseDate: string | null = null;
    private doseStart: string | null = null;
    private doseEnd: string | null = null;
    private doseCount: number | null = null;

    private newVaccinator = false;
    private name = "";
    private phoneNumber = "";
    private landlineNumber: string | null = null;
    private address = "";
    private geocodingHasChanged: boolean | null = null;
    private geocoding: Geocoding | null = null;
    private siret: string | null = null;

    private showUpdatePassword = false;
    private password: string | null = null;
    private newPassword: string | null = null;

    private timer: NodeJS.Timeout | null = null;

    mounted() {
        this.refresh();
        this.timer = setInterval(this.refresh, 30000);
    }

    destroyed() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private refresh() {
        Promise.all([
            store.dispatch.vaccinator.current(),
            store.dispatch.vaccinator.getCurrentDoses(),
        ]).then(() => {
            this.doRefresh();
        });
    }

    private doRefresh() {
        if (store.getters.vaccinator.current === null) {
            this.$router.push({ name: "main" });
        }
        const vaccinator = store.getters.vaccinator.current!;
        this.newVaccinator = vaccinator.newVaccinator;
        this.name = vaccinator.name;
        this.phoneNumber = vaccinator.phoneNumber;
        this.landlineNumber = vaccinator.landlineNumber;
        this.address = vaccinator.address;
        this.geocodingHasChanged =
            this.geocoding !== null && this.geocoding !== vaccinator.geocoding;
        this.geocoding = vaccinator.geocoding;
        this.siret = vaccinator.siret;
        const doses = store.getters.vaccinator.doses;
        this.doses = doses;
    }

    get newDoseDisabled() {
        return this.geocoding !== "SUCCESSFUL";
    }

    get geocodingNotificationProps() {
        const types = {
            NONE: "is-info",
            SUCCESSFUL: "is-success",
            FAILED: "is-danger",
        };
        const active =
            (this.geocoding !== null && this.geocoding !== "SUCCESSFUL") ||
            this.newVaccinator ||
            this.geocodingHasChanged === true;
        return {
            active: active,
            type: types[this.geocoding || "NONE"],
            autoClose: this.geocoding === "SUCCESSFUL",
            duration: 120000,
        };
    }

    get geocodingNotificationText() {
        const messages = {
            NONE: "geocodingPending",
            SUCCESSFUL: "geocodingOk",
            FAILED: "geocodingFailed",
        };
        return this.$t(messages[this.geocoding || "NONE"]);
    }

    get addressFieldProps() {
        const failed = this.address && this.geocoding === "FAILED";
        return {
            type: failed ? "is-danger" : null,
            message: failed ? this.$t("addressGeocodingFailed") : null,
        };
    }

    private doShowNewDose() {
        this.showNewDose = true;
        this.doseName = null;
        this.doseMminAge = null;
        const now = new Date();
        this.doseDate = getIsoDate(now);
        this.doseStart = now.toISOString();
        // default is a 2h time window
        now.setTime(now.getTime() + 7200000);
        this.doseEnd = now.toISOString();
        this.doseCount = null;
    }

    get doseKeymap() {
        return { enter: this.doCreateDose };
    }

    private doCreateDose() {
        if (!this.doseCreationDisabled) {
            const start = replaceTimestamp(new Date(this.doseDate!), new Date(this.doseStart!));
            const end = replaceTimestamp(new Date(this.doseDate!), new Date(this.doseEnd!));
            const dose = {
                name: this.doseName,
                minAge: this.doseMminAge,
                start: start.toISOString(),
                end: end.toISOString(),
                count: this.doseCount!,
                msg: this.$t("dose.creationSuccess").toString(),
            };
            const message = this.$t("dose.confirmationMessage", {
                description: this.doseDescription(dose),
            }).toString();
            this.$buefy.dialog.confirm({
                title: this.$t("dose.confirmationTitle").toString(),
                message: message,
                cancelText: this.$t("dose.cancel").toString(),
                confirmText: this.$t("dose.confirm").toString(),
                type: "is-success",
                onConfirm: () =>
                    store.dispatch.vaccinator.createDose(dose).then((doses) => {
                        this.doses = doses;
                        this.showNewDose = false;
                    }),
            });
        }
    }

    get doseCreationDisabled() {
        return (
            this.doseCreationLoading ||
            !this.doseDate ||
            !this.doseStart ||
            !this.doseEnd ||
            !this.doseCount ||
            this.doseCount < 1 ||
            (this.doseMminAge != null && this.doseMminAge < 30)
        );
    }

    get doseCreationLoading() {
        return this.showNewDose && this.inProgress("createDose");
    }

    doseDescription(dose: VaccinatorDoseCreation) {
        return (
            "<b>" +
            this.$tc("dose.description", dose.count, {
                day:
                    getIsoDate(new Date(dose.start)) === getIsoDate(new Date())
                        ? this.$t("dose.today")
                        : formatIsoDate(this.$i18n.locale, dose.start),
                start: formatIsoTime(this.$i18n.locale, dose.start),
                end: formatIsoTime(this.$i18n.locale, dose.end),
                count: dose.count,
                name: dose.name || this.$t("dose.defaultName"),
            }) +
            "</b>"
        );
    }

    doseCandidatesDescription(dose: VaccinatorDose) {
        if (dose.notifiedCandidates == 0) {
            return this.$t("dose.noCandidate");
        } else {
            const count = dose?.candidates?.length || 0;
            return this.$tc("dose.candidatesDescription", count, {
                count: count,
            });
        }
    }

    doseCandidateDescription(candidate: VaccinatorDoseCandidate) {
        return `<a href="tel:${candidate.phoneNumber}">${candidate.phoneNumber}</a>`;
    }

    private doVaccinatorUpdate() {
        if (!this.vaccinatorUpdateDisabled) {
            store.dispatch.vaccinator
                .update({
                    name: this.name!,
                    phoneNumber: this.phoneNumber!,
                    landlineNumber: this.landlineNumber,
                    address: this.address!,
                    siret: this.siret!,
                    password: this.password,
                    newPassword: this.newPassword,
                    msg: this.$t("updateSuccess").toString(),
                })
                .then(() => this.doRefresh());
        }
    }

    private doShowUpdatePassword() {
        this.showUpdatePassword = true;
        this.password = null;
        this.newPassword = null;
    }

    get passwordKeymap() {
        return { enter: this.doUpdatePassword };
    }

    private doUpdatePassword() {
        if (!this.passwordUpdateDisabled) {
            store.dispatch.vaccinator
                .update({
                    name: this.name!,
                    phoneNumber: this.phoneNumber!,
                    landlineNumber: this.landlineNumber,
                    address: this.address!,
                    siret: this.siret!,
                    password: this.password,
                    newPassword: this.newPassword,
                    msg: this.$t("updatePasswordSuccess").toString(),
                })
                .then(() => (this.showUpdatePassword = false));
        }
    }

    get vaccinatorUpdateDisabled() {
        return (
            this.vaccinatorUpdateLoading ||
            !this.name ||
            !this.phoneNumber ||
            !this.address ||
            !this.siret ||
            (!/^(\d{9})$/.test(this.siret) && !/^(\d{14})$/.test(this.siret))
        );
    }

    get passwordUpdateLoading() {
        return this.showUpdatePassword && this.inProgress("updateVaccinator");
    }

    get passwordUpdateDisabled() {
        return (
            this.passwordUpdateLoading || !this.password || !this.newPassword
        );
    }

    get vaccinatorUpdateLoading() {
        return this.inProgress("updateVaccinator");
    }
}
</script>

<i18n>
{
    "fr": {
        "subtitle": "Votre espace vaccinateur",
        "newDose": "Déclarer des doses disponibles",
        "dose": {
            "title": "Déclarer des doses disponibles",
            "name": "Nom du vaccin",
            "nameOptions": [
                "Pfizer/BioNTech",
                "Moderna",
                "AstraZeneca",
                "Janssen"
            ],
            "count": "Nombre de doses*",
            "minAge": "Âge minimum",
            "day": "Date de la séance*",
            "start": "Début du créneau horaire*",
            "end": "Fin du créneau horaire*",
            "confirm": "Confirmer",
            "cancel": "Annuler",
            "confirmationTitle": "Confirmation",
            "confirmationMessage": "Confirmez la déclaration suivante&nbsp;?<br>{description}",
            "creationSuccess": "Opération réussie, nous recherchons des candidats !",
            "today": "Aujourd'hui",
            "defaultName": "vaccin",
            "description": "{day}, de {start} à {end}&nbsp;: {count} dose de {name} | {day}, de {start} à {end}&nbsp;: {count} doses de {name}",
            "noCandidate": "Aucun candidat disponible.",
            "candidatesDescription": "Les candidats ont été notifiés, en attente de leur réponse. | Candidat confirmé (cliquez pour appeler)&nbsp;: 1 | Candidats confirmés (cliquez pour appeler)&nbsp: {count}",
            "candidatePhoneNumber": "Numéro de portable",
            "candidateAccepted": "Validation"
        },
        "info": "Vos informations",
        "name": {
            "label": "Nom*",
            "placeholder": "Votre nom ou le nom de votre établissement"
        },
        "phoneNumber": {
            "label": "Numéro de téléphone portable*",
            "placeholder": "0612345678"
        },
        "landlineNumber": {
            "label": "Numéro de téléphone fixe",
            "placeholder": "0112345678"
        },
        "address": {
            "label": "Adresse postale*",
            "placeholder": "Votre adresse postale"
        },
        "siret": {
            "label": "SIRET*",
            "placeholder": "Votre numéro de SIRET (ou SIREN)"
        },
        "update": "Modifier vos informations",
        "updateSuccess": "Vos informations ont été mises à jour",
        "passwordInfo": "Votre mot de passe",
        "changePassword": "Changer votre mot de passe",
        "currentPassword": "Mot de passe actuel",
        "newPassword": "Nouveau mot de passe",
        "cancel": "Annuler",
        "confirm": "Confirmer",
        "updatePasswordSuccess": "Votre mot de passe a été mis à jour",
        "geocodingOk": "Nous avons localisé et normalisé votre adresse postale. Merci de vérifier ci-dessous si elle est correcte.",
        "geocodingPending": "Nous sommes en train de localiser votre adresse postale. Cela va prendre quelques instants...",
        "geocodingFailed": "Nous n'avons pas pu localiser votre adresse postale. Merci de la corriger ci-dessous.",
        "addressGeocodingFailed": "Adresse postale non localisable"
   },
    "en": {
        "subtitle": "Your vaccinator workspace",
        "newDose": "Declare available doses",
        "dose": {
            "title": "Declare available doses",
            "name": "Vaccine name",
            "nameOptions": [
                "Pfizer/BioNTech",
                "Moderna",
                "AstraZeneca",
                "Janssen"
            ],
            "count": "Number of doses*",
            "minAge": "Minimum age (years)",
            "day": "Session date*",
            "start": "Start time*",
            "end": "End time*",
            "confirm": "Confirm",
            "cancel": "Cancel",
            "confirmationTitle": "Confirmation",
            "confirmationMessage": "Do you confirm the following declaration?<br>{description}",
            "creationSuccess": "Operation successful, we are searching for candidates!",
            "today": "Today",
            "defaultName": "vaccine",
            "description": "{day}, from {start} to {end}: {count} {name} dose | {day}, from {start} to {end}: {count} {name} doses",
            "noCandidate": "No available candidate.",
            "candidatesDescription": "No validated candidate yet. | One validated candidate (click to call): | {count} validated candidates (click to call):",
            "candidatePhoneNumber": "Mobile number",
            "candidateAccepted": "Validated"
        },
        "info": "Your information",
        "name": {
            "label": "Name*",
            "placeholder": "Your name"
        },
        "phoneNumber": {
            "label": "Mobile phone number*",
            "placeholder": "0612345678"
        },
        "landlineNumber": {
            "label": "Landline number",
            "placeholder": "0112345678"
        },
        "address": {
            "label": "Postal address*",
            "placeholder": "Your postal address"
        },
        "siret": {
            "label": "SIRET*",
            "placeholder": "Your SIRET number (or SIREN)"
        },
        "update": "Update your information",
        "updateSuccess": "Your information has been successfully updated",
        "passwordInfo": "Your password",
        "changePassword": "Change your password",
        "currentPassword": "Current password",
        "newPassword": "New password",
        "cancel": "Cancel",
        "confirm": "Confirm",
        "updatePasswordSuccess": "Your password has been successfully updated",
        "geocodingOk": "We have localized and normalized your postal address. Please verify below if it is correct.",
        "geocodingPending": "We are localizing your postal address. This will take a few seconds...",
        "geocodingFailed": "We could not localize your postal address. Please correct it below.",
        "addressGeocodingFailed": "Postal address not localizable"
    }
}
</i18n>
