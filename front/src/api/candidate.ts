import { api } from "@/api/api";
import { AxiosResponse } from 'axios';

export interface CandidateCreation {
    phoneNumber: string;
    postcode: string;
    birthdate: string | null;
}

export interface CandidateValidation {
    id: string;
    otp: string;
}

export const candidateService = {
    create: (request: CandidateCreation): Promise<AxiosResponse<string>> => api.post("v0/candidate/create", request),
    validate: (request: CandidateValidation): Promise<AxiosResponse<void>> => api.post("v0/candidate/validate", request),
};
