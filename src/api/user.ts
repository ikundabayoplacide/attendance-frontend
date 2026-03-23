import { client } from "./clients";

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result: T;
    statusCode: number;
}

export interface EquipmentAssignment {
    name: string;
    serialNumber: string;
}

export interface UserCreateRequest {
    fullName: string;
    email?: string;
    password?: string;
    scannedId: string;
    phoneNumber?: string;
    status?: string;
    category?: string;
    badge?: string;
    role?: string;
    company?: string;
    department?: string;
    nationalId?: string;
    equipments?: EquipmentAssignment[];
    cardId?: string;
}

export interface AttendanceInfo {
    id: string;
    userId: string;
    checkIn: Date;
    date: string;
    status: string;
}

export interface UserWithAttendanceResponse {
    user: any;
    attendance: AttendanceInfo;
    isNewUser: boolean;
}

export type UserCreateResponse = ServiceResponse<UserWithAttendanceResponse>;

export const userApi = {
    createUser: async (userData: UserCreateRequest): Promise<UserCreateResponse> => {
        const response = await client.post('/users', userData);
        return response.data;
    },

    getAllUsers: async (params?: { search?: string; limit?: number }): Promise<ServiceResponse<any[]>> => {
        const response = await client.get('/users', { params });
        return response.data;
    },

    getUserById: async (id: string): Promise<ServiceResponse<any>> => {
        const response = await client.get(`/users/${id}`);
        return response.data;
    },

    updateUser: async (id: string, userData: any): Promise<ServiceResponse<any>> => {
        const response = await client.put(`/users/${id}`, userData);
        return response.data;
    },

    deleteUser: async (id: string): Promise<ServiceResponse<any>> => {
        const response = await client.delete(`/users/${id}/delete`);
        return response.data;
    },

    suspendUser: async (id: string): Promise<ServiceResponse<any>> => {
        const response = await client.put(`/users/${id}/suspend`);
        return response.data;
    },

    activateUser: async (id: string): Promise<ServiceResponse<any>> => {
        const response = await client.put(`/users/${id}/activate`);
        return response.data;
    }
};