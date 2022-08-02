import { api } from "@/api/api";
import { AxiosResponse } from 'axios';

export interface Admin {
    email: string
}

export interface AdminLogin {
    email: string;
    password: string;
}

export interface AdminTriggerPasswordReset {
    email: string;
    url: string;
}

export interface AdminResetPassword {
    newPassword: string;
    key: string;
}

export interface AdminUploadPatientFile {
    vaccinatorId: string;
    patientFile: File;
}

export const adminService = {
    login: (request: AdminLogin): Promise<AxiosResponse<Admin>> => api.post("v0/admin/login", request),
    logout: (): Promise<AxiosResponse<void>> => api.get("v0/admin/logout"),
    getCurrent: (): Promise<AxiosResponse<Admin>> => api.get("v0/admin/current"),
    triggerPasswordReset: (request: AdminTriggerPasswordReset): Promise<AxiosResponse<void>> => api.post("v0/admin/triggerPasswordReset", request),
    resetPassword: (request: AdminResetPassword): Promise<AxiosResponse<Admin>> => api.put("v0/admin/resetPassword", request),
    uploadPatientFile: (request: AdminUploadPatientFile): Promise<AxiosResponse<void>> => {
        const formData = new FormData();
        formData.append('vaccinatorId', request.vaccinatorId);
        formData.append('file', request.patientFile);
        return api.post("v0/admin/patients", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
};
