import store from '@/store';
import { adminService, Admin } from "@/api/admin";


export interface AdminState {
    admin: Admin | null | undefined;     // current admin (not null=authentified, null=not authentified, undefined=not checked)
}

export default {
    namespaced: true as const,
    state: {
        admin: undefined
    } as AdminState,
    getters: {
        current: (state: AdminState): Admin | null | undefined => {
            return state.admin;
        }
    },
    mutations: {
        setCurrent(state: AdminState, admin: Admin | null | undefined) {
            state.admin = admin;
        },
    },
    actions: {
        setCurrent(_context: any, payload: { admin: Admin }): Promise<Admin> {
            return new Promise(resolve => {
                store.commit.admin.setCurrent(payload.admin);
                resolve(payload.admin);
            });
        },
        clearCurrent(): Promise<void> {
            return new Promise(resolve => {
                store.commit.admin.setCurrent(null);
                resolve();
            });
        },
        login(_context: any, payload: { email: string; password: string; msg: string }): Promise<Admin> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'loginAdmin' });
                adminService.login(payload)
                    .then(response => store.dispatch.admin.setCurrent({ admin: response.data }))
                    .then(admin => {
                        store.dispatch.api.success({ name: 'loginAdmin', msg: payload.msg });
                        resolve(admin);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'loginAdmin', error: error });
                    });
            });
        },
        current(): Promise<Admin | null> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'currentAdmin' });
                adminService.getCurrent()
                    .then(response => store.dispatch.admin.setCurrent({ admin: response.data }))
                    .then(admin => {
                        store.dispatch.api.success({ name: 'currentAdmin' });
                        resolve(admin);
                    })
                    .catch(() => {
                        // silence error, in case the admin is not logged in
                        store.commit.admin.setCurrent(null);
                        store.dispatch.api.success({ name: 'currentAdmin' });
                        resolve(null);
                    });
            });
        },
        logout(_context: any, payload: { msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'logoutAdmin' });
                adminService.logout()
                    .then(() => store.dispatch.admin.clearCurrent())
                    .then(() => {
                        store.dispatch.api.success({ name: 'logoutAdmin', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'logoutAdmin', error: error })
                    });
            });
        },
        triggerPasswordReset(_context: any, payload: { url: string; email: string; msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'triggerAdminPasswordReset' });
                adminService.triggerPasswordReset(payload)
                    .then(() => {
                        store.dispatch.api.success({ name: 'triggerAdminPasswordReset', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'triggerAdminPasswordReset', error: error });
                    });
            });
        },
        resetPassword(_context: any, payload: { newPassword: string; key: string; msg: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'resetAdminPassword' });
                adminService.resetPassword(payload)
                    .then(response => store.dispatch.admin.setCurrent({ admin: response.data }))
                    .then(admin => {
                        store.dispatch.api.success({ name: 'resetAdminPassword', msg: payload.msg });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'resetAdminPassword', error: error });
                    });
            });
        },
        uploadPatientFile(_context: any, payload: { vaccinatorId: string; patientFile: File }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'uploadPatientFile' });
                adminService.uploadPatientFile(payload)
                    .then(response => store.dispatch.api.success({ name: 'uploadPatientFile' }))
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'uploadPatientFile', error: error });
                    });
        });
    },
}
};
