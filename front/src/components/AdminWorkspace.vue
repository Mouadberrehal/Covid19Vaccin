<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <article class="tile is-child box">
                <h1 class="title" v-html="$t('title')" />
            </article>
            <article class="tile is-child box">
                <b-field label="vaccinator_id">
                    <b-input v-model="vaccinatorId" type="text" />
                </b-field>
                <b-field
                    class="file is-primary"
                    :class="{ 'has-name': !!patientFile }"
                >
                    <b-upload v-model="patientFile" class="file-label">
                        <span class="file-cta">
                            <b-icon class="file-icon" icon="upload"></b-icon>
                            <span class="file-label">Choose patient file</span>
                        </span>
                        <span class="file-name" v-if="patientFile">
                            {{ patientFile.name }}
                        </span>
                    </b-upload>
                </b-field>
                <div class="level">
                    <div class="level-item">
                        <b-button
                            type="is-primary"
                            @click="doUploadPatientFile"
                            :loading="uploadPatientFileLoading"
                            :disabled="uploadPatientFileDisabled"
                        >
                            Upload patient file
                        </b-button>
                        <!--
                        <b-button
                            type="is-primary"
                            @click="doShowUpdatePassword"
                        >
                            {{ $t("changePassword") }}
                        </b-button>
                        -->
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
import { formatIsoDate, getIsoDate, formatIsoTime } from "@/util/datetime";

@Component<AdminWorkspace>({ components: { DateInput, TimeInput } })
export default class AdminWorkspace extends Base {
    private email = "";

    private vaccinatorId: string | null = null;
    private patientFile: File | null = null;

    private showUpdatePassword = false;
    private password: string | null = null;
    private newPassword: string | null = null;

    mounted() {
        this.doRefresh();
    }

    private doRefresh() {
        if (store.getters.admin.current === null) {
            this.$router.push({ name: "main" });
        }
        const admin = store.getters.admin.current!;
        this.email = admin.email;
    }

    private doUploadPatientFile() {
        if (!this.uploadPatientFileDisabled) {
            store.dispatch.admin.uploadPatientFile({
                vaccinatorId: this.vaccinatorId!,
                patientFile: this.patientFile!,
            });
        }
    }
    get uploadPatientFileLoading() {
        return this.inProgress("uploadPatientFile");
    }

    get uploadPatientFileDisabled() {
        return (
            !this.vaccinatorId ||
            !this.patientFile ||
            this.uploadPatientFileLoading
        );
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
        }
    }

    get adminUpdateDisabled() {
        return this.adminUpdateLoading;
    }

    get passwordUpdateLoading() {
        return this.showUpdatePassword && this.inProgress("updateAdmin");
    }

    get passwordUpdateDisabled() {
        return (
            this.passwordUpdateLoading || !this.password || !this.newPassword
        );
    }

    get adminUpdateLoading() {
        return this.inProgress("updateAdmin");
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "Votre espace administrateur"
   },
    "en": {
        "title": "Your admin workspace"
    }
}
</i18n>
