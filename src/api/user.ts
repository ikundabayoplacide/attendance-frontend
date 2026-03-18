import { User } from "./auth";
import { client } from "./clients";

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result: T;
    page?: number;
    pageSize?: number;
    total?: number;
}
export type UsersListParams = {
  page?: number;
  limit?: number;
  search?: string
};
export type UserCreateRequest= {
  email: string;
  fullName: string;
  phoneNumber?: string;
  category?:string;
  department?:string;
  company?:string;
  status?: 'active' | 'inactive' | 'pending' | 'rejected';
  password?:string;
}

export type UserUpdateRequest = Partial<UserCreateRequest>;
export type UserResponse = ServiceResponse<User>;

export const usersApi = {
    getAll: async (params: UsersListParams = {}): Promise<ServiceResponse<User[]>> => {
        const { data } = await client.get('/users', { params });
        return data;
    },

    getById: async (userId: string): Promise<ServiceResponse<User>> => {
        const { data } = await client.get(`/users/${userId}`);
        return data;
    },

    create: async (payload: UserCreateRequest): Promise<ServiceResponse<User>> => {
        const { data } = await client.post('/users', payload);
        return data;
    },

    update: async (userId: string, payload: Partial<UserCreateRequest>): Promise<ServiceResponse<User>> => {
        const { data } = await client.put(`/users/${userId}`, payload);
        return data;
    },
    activate: async (userId: string): Promise<ServiceResponse<User>> => {
        const { data } = await client.put(`/users/${userId}/activate`);
        return data;
    },
    suspend:async(userId:string):Promise<ServiceResponse<User>>=>{
        const {data}=await client.put(`/users/${userId}/suspend`);
        return data;
    },
    remove: async (userId: string): Promise<ServiceResponse<User>> => {
        console.log("Deleting user with ID:", userId);
        console.log('Full URL:',`/users/${userId}/delete`)
        const { data } = await client.delete(`/users/${userId}/delete`);
        return data;
    },
};