import store from '@/store';
import { candidateService, CandidateCreation } from "@/api/candidate";


export default {
    namespaced: true as const,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        create(_context: any, payload: { phoneNumber: string; postcode: string; birthdate: string | null }): Promise<string> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'createCandidate' });
                candidateService.create(payload)
                    .then(response => {
                        const validationId = response.data;
                        store.dispatch.api.success({ name: 'createCandidate' });
                        resolve(validationId);
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'createCandidate', error: error });
                    });
            });
        },
        validate(_context: any, payload: { validationId: string, otp: string }): Promise<void> {
            return new Promise((resolve, reject) => {
                store.dispatch.api.start({ name: 'validateCandidate' });
                candidateService.validate({ id: payload.validationId, otp: payload.otp })
                    .then(response => {
                        store.dispatch.api.success({ name: 'validateCandidate' });
                        resolve();
                    })
                    .catch(error => {
                        store.dispatch.api.failure({ name: 'validateCandidate', error: error });
                    });
            });
        }
    }
};
