import { client } from "./clients";

//Generic service response used by backend
interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result:T;
    page?: number;
    pageSize?: number;
    total?: number;
}

export type PermissionEntry = {
    id: string;
    name: string;
    description: string;
    category: string;
    createdAt:string;
    updatedAt:string;
};

export type PermissionsListResponse = ServiceResponse<PermissionEntry[]>;
export type PermissionResponse = ServiceResponse<PermissionEntry>;


export type UpdatePermissionsRequest = {
    permissions: string[];
};

export type PermissionCreateRequest = {
    name:string;
    description?:string;
}

// Permissions API functions
export const permissionsApi = {

    // Fetch all permissions
    list: async (): Promise<PermissionsListResponse> => {
        const { data } = await client.get('/permissions');
        return data;
    },

    // Fetch permissions for a specific role
    getById: async (PermissionId: string): Promise<PermissionResponse> => {
        const { data } = await client.get(`/permissions/${PermissionId}`);
        return data;
    },

    // Update permissions for a specific role
    update: async (permissionId: string,payload: UpdatePermissionsRequest): Promise<{ message: string }> => {
        const { data } = await client.put(`/permissions/${permissionId}`, payload);
        return data;
    },

    //delete permissions for a specific role
    remove: async (permissionId: string): Promise<{ message: string }> => {
        const { data } = await client.delete(`/permissions/${permissionId}`);
        return data;
    },

    create: async (permissionData: PermissionCreateRequest): Promise<{ message: string }> => {
        const { data } = await client.post('/permissions', permissionData);
        return data;
    }
}


