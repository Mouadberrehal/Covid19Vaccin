import Vue from "vue";
import VueRouter from "vue-router";
import Main from '@/components/Main.vue';
import CandidateCode from '@/components/CandidateCode.vue';
import CandidateWelcome from '@/components/CandidateWelcome.vue';
import VaccinatorSignup from '@/components/VaccinatorSignup.vue';
import VaccinatorCode from '@/components/VaccinatorCode.vue';
import VaccinatorWelcome from '@/components/VaccinatorWelcome.vue';
import VaccinatorLogin from '@/components/VaccinatorLogin.vue';
import VaccinatorWorkspace from '@/components/VaccinatorWorkspace.vue';
import VaccinatorResetPassword from '@/components/VaccinatorResetPassword.vue';
import Presentation from '@/components/Presentation.vue';
import FAQ from '@/components/FAQ.vue';
import SupportUs from '@/components/SupportUs.vue';
import Legal from '@/components/Legal.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import AdminWorkspace from '@/components/AdminWorkspace.vue';
import AdminResetPassword from '@/components/AdminResetPassword.vue';
import store from "@/store";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", name: 'main', component: Main },
        { path: "/validation-candidat/:phoneNumber/:validationId", name: 'validateCandidate', component: CandidateCode, props: true },
        { path: "/confirmation-candidat/:phoneNumber", name: 'confirmCandidate', component: CandidateWelcome, props: true },
        { path: "/inscription-vaccinateur", name: 'vaccinatorSignup', component: VaccinatorSignup },
        { path: "/validation-vaccinateur/:phoneNumber/:validationId", name: 'validateVaccinator', component: VaccinatorCode, props: true },
        { path: "/confirmation-vaccinateur/:phoneNumber", name: 'confirmVaccinator', component: VaccinatorWelcome, props: true },
        { path: "/connexion-vaccinateur", name: 'vaccinatorLogin', component: VaccinatorLogin },
        { path: "/espace-vaccinateur", name: 'vaccinatorWorkspace', component: VaccinatorWorkspace, meta: { requiresAuth: true } },
        { path: "/reinit-mot-de-passe/:phoneNumber/:resetKey", name: 'vaccinatorResetPassword', component: VaccinatorResetPassword, props: true },
        { path: "/presentation", name: 'presentation', component: Presentation },
        { path: "/faq", name: 'faq', component: FAQ },
        { path: "/nous-soutenir", name: 'supportUs', component: SupportUs },
        { path: "/mentions-legales", name: 'legal', component: Legal },
        { path: "/connexion-administrateur", name: 'adminLogin', component: AdminLogin },
        { path: "/espace-administrateur", name: 'adminWorkspace', component: AdminWorkspace, meta: { requiresAdmin: true } },
        { path: "/reinit-mot-de-passe-adminsitratuer/:email/:resetKey", name: 'adminResetPassword', component: AdminResetPassword, props: true },
        { path: "*", component: PageNotFound }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.getters.vaccinator.current === undefined) {
            store.dispatch.vaccinator.current().then(vaccinator => {
                if (vaccinator) {
                    next();
                } else {
                    next({ name: 'vaccinatorLogin', query: { redirect: to.fullPath } });
                }
            });
        } else if (store.getters.vaccinator.current === null) {
            next({ name: 'vaccinatorLogin', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    } else if (to.matched.some(route => route.meta.requiresAdmin)) {
        if (store.getters.admin.current === undefined) {
            store.dispatch.admin.current().then(admin => {
                if (admin) {
                    next();
                } else {
                    next({ name: 'adminLogin', query: { redirect: to.fullPath } });
                }
            });
        } else if (store.getters.admin.current === null) {
            next({ name: 'adminLogin', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    } else {
        next();
    }
})