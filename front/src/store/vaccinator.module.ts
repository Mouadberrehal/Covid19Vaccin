import store from '@/store';
import { vaccinatorService, Vaccinator, VaccinatorDose } from "@/api/vaccinator";


export interface VaccinatorState {
    vaccinator: Vaccinator | null | undefined;     // current vaccinator (not null=authentified, null=not authentified, undefined=not checked)
    doses: Array<VaccinatorDose> | null;
}

export default {
    namespaced: true as const,
    state: {
        vaccinator: undefined,
        doses: null
    } as VaccinatorState,
    getters: {
        current: (state: VaccinatorState): Vaccinator | null | undefined => {
            return state.vaccinator;
        },
        doses: (state: VaccinatorState): Array<VaccinatorDose> | null => {
            return state.doses;
        },
    },
    mutations: {
        setCurrent(state: VaccinatorState, vaccinator: Vaccinator | null | undefined) {
            state.vaccinator = vaccinator;
            if (!vaccinator) {
                state.doses = null;
            }
        },
        setDoses(state: VaccinatorState, doses: Array<VaccinatorDose> | null) {
            state.doses = doses;
        },
    },
    actions: {
        create(_context: any, payload: {
            name: string;
            phoneNumber: string;
            password: string;
            landlineNumber: string | null;
            address: string;
            siret: string;
        }): Promise<string> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'createVaccinator' });
                vaccinatorService.create(payload)
                    .then(response => {
                        const validationId = response.data;
                        store.dispatch.api.success({ name: 'createVaccinator' });
                        resolve(validationId);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'createVaccinator', error: error });
                    });
            });
        },
        update(_context: any, payload: {
            name: string;
            phoneNumber: string;
            landlineNumber: string | null;
            address: string;
            siret: string;
            password: string | null;
            newPassword: string | null;
            msg: string
        }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'updateVaccinator' });
                vaccinatorService.update(payload)
                    .then(response => store.dispatch.vaccinator.setCurrent({ vaccinator: response.data }))
                    .then(vaccinator => {
                        store.dispatch.api.success({ name: 'updateVaccinator', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'updateVaccinator', error: error });
                    });
            });
        },
        validate(_context: any, payload: { validationId: string, otp: string }): Promise<Vaccinator> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'validateVaccinator' });
                vaccinatorService.validate({ id: payload.validationId, otp: payload.otp })
                    .then(response => store.dispatch.vaccinator.setCurrent({ vaccinator: response.data }))
                    .then(vaccinator => {
                        store.dispatch.api.success({ name: 'validateVaccinator' });
                        resolve(vaccinator);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'validateVaccinator', error: error });
                    });
            });
        },
        setCurrent(_context: any, payload: { vaccinator: Vaccinator }): Promise<Vaccinator> {
            return new Promise(resolve => {
                store.commit.vaccinator.setCurrent(payload.vaccinator);
                resolve(payload.vaccinator);
            });
        },
        clearCurrent(): Promise<void> {
            return new Promise(resolve => {
                store.commit.vaccinator.setCurrent(null);
                resolve();
            });
        },
        setDoses(_context: any, payload: { doses: Array<VaccinatorDose> }): Promise<Array<VaccinatorDose>> {
            return new Promise(resolve => {
                store.commit.vaccinator.setDoses(payload.doses);
                resolve(payload.doses);
            });
        },
        login(_context: any, payload: { phoneNumber: string; password: string; msg: string }): Promise<Vaccinator> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'loginVaccinator' });
                vaccinatorService.login(payload)
                    .then(response => store.dispatch.vaccinator.setCurrent({ vaccinator: response.data }))
                    .then(vaccinator => {
                        store.dispatch.api.success({ name: 'loginVaccinator', msg: payload.msg });
                        resolve(vaccinator);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'loginVaccinator', error: error });
                    });
            });
        },
        current(): Promise<Vaccinator | null> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'currentVaccinator' });
                vaccinatorService.getCurrent()
                    .then(response => store.dispatch.vaccinator.setCurrent({ vaccinator: response.data }))
                    .then(vaccinator => {
                        store.dispatch.api.success({ name: 'currentVaccinator' });
                        resolve(vaccinator);
                    })
                    .catch(() => {
                        // silence error, in case the vaccinator is not logged in
                        store.commit.vaccinator.setCurrent(null);
                        store.dispatch.api.success({ name: 'currentVaccinator' });
                        resolve(null);
                    });
            });
        },
        logout(_context: any, payload: { msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'logoutVaccinator' });
                vaccinatorService.logout()
                    .then(() => store.dispatch.vaccinator.clearCurrent())
                    .then(() => {
                        store.dispatch.api.success({ name: 'logoutVaccinator', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'logoutVaccinator', error: error })
                    });
            });
        },
        triggerPasswordReset(_context: any, payload: { url: string; phoneNumber: string; msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'triggerVaccinatorPasswordReset' });
                vaccinatorService.triggerPasswordReset(payload)
                    .then(() => {
                        store.dispatch.api.success({ name: 'triggerVaccinatorPasswordReset', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'triggerVaccinatorPasswordReset', error: error });
                    });
            });
        },
        resetPassword(_context: any, payload: { newPassword: string; key: string; msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'resetVaccinatorPassword' });
                vaccinatorService.resetPassword(payload)
                    .then(response => store.dispatch.vaccinator.setCurrent({ vaccinator: response.data }))
                    .then(vaccinator => {
                        store.dispatch.api.success({ name: 'resetVaccinatorPassword', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'resetVaccinatorPassword', error: error });
                    });
            });
        },
        createDose(_context: any, payload: { name: string | null; minAge: number | null; start: string; end: string; count: number; msg: string }): Promise<Array<VaccinatorDose>> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'createDose' });
                vaccinatorService.createDose(payload)
                    .then(response => store.dispatch.vaccinator.setDoses({ doses: response.data }))
                    .then(doses => {
                        store.dispatch.api.success({ name: 'createDose', msg: payload.msg });
                        resolve(doses);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'createDose', error: error });
                    });
            });
        },
        getCurrentDoses(_context: any): Promise<Array<VaccinatorDose>> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'getCurrentDoses' });
                vaccinatorService.getCurrentDoses()
                    .then(response => store.dispatch.vaccinator.setDoses({ doses: response.data }))
                    .then(doses => {
                        store.dispatch.api.success({ name: 'getCurrentDoses' });
                        resolve(doses);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'getCurrentDoses', error: error });
                    });
            });
        },
    }
};
