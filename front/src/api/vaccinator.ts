import { api } from "@/api/api";
import { AxiosResponse } from 'axios';

export type Geocoding = "NONE" | "SUCCESSFUL" | "FAILED";
export interface Vaccinator {
    name: string;
    phoneNumber: string;
    landlineNumber: string | null,
    address: string,
    geocoding: Geocoding,
    siret: string | null,
    newVaccinator: boolean;     // can be used for onboarding
}

export interface VaccinatorLogin {
    phoneNumber: string;
    password: string;
}

export interface VaccinatorCreation {
    name: string;
    phoneNumber: string;
    password: string | null;
    landlineNumber: string | null;
    address: string;
    siret: string;
}

export interface VaccinatorUpdate extends VaccinatorCreation {
    newPassword: string | null;
}

export interface VaccinatorValidation {
    id: string;
    otp: string;
}

export interface VaccinatorTriggerPasswordReset {
    phoneNumber: string;
    url: string;
}

export interface VaccinatorResetPassword {
    newPassword: string;
    key: string;
}

export interface VaccinatorDoseCreation {
    name: string | null;
    minAge: number | null;
    start: string;
    end: string;
    count: number;
}

export interface VaccinatorDoseCandidate {
    phoneNumber: string;
    accepted: string;
}

export interface VaccinatorDose extends VaccinatorDoseCreation {
    id: string | undefined;
    candidates: Array<VaccinatorDoseCandidate> | undefined;
    notifiedCandidates: number;
}

export const vaccinatorService = {
    login: (request: VaccinatorLogin): Promise<AxiosResponse<Vaccinator>> => api.post("v0/vaccinator/login", request),
    logout: (): Promise<AxiosResponse<void>> => api.get("v0/vaccinator/logout"),
    getCurrent: (): Promise<AxiosResponse<Vaccinator>> => api.get("v0/vaccinator/current"),
    create: (request: VaccinatorCreation): Promise<AxiosResponse<string>> => api.post("v0/vaccinator/create", request),
    validate: (request: VaccinatorValidation): Promise<AxiosResponse<Vaccinator>> => api.post("v0/vaccinator/validate", request),
    update: (request: VaccinatorUpdate): Promise<AxiosResponse<Vaccinator>> => api.post("v0/vaccinator/update", request),
    triggerPasswordReset: (request: VaccinatorTriggerPasswordReset): Promise<AxiosResponse<void>> => api.post("v0/vaccinator/triggerPasswordReset", request),
    resetPassword: (request: VaccinatorResetPassword): Promise<AxiosResponse<Vaccinator>> => api.put("v0/vaccinator/resetPassword", request),
    createDose: (request: VaccinatorDoseCreation): Promise<AxiosResponse<Array<VaccinatorDose>>> => api.post("v0/vaccinator/doses", request),
    getCurrentDoses: (): Promise<AxiosResponse<Array<VaccinatorDose>>> => api.get("v0/vaccinator/doses"),
};
