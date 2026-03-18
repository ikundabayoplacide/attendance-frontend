import { client } from "./clients";

//Generic services response used by backend
export type ServiceResponse<T> = {
    message: string;
    result: T;
    success: boolean;
    page?: number;
    totalPages?: number;
    total?: number;
}

export type PermissionEntity = {
    id:string;
    name:string;
    description:string|null;
};

export type RoleEntity = {
    id:string;
    name:string;
    description:string|null;
    permissions?: PermissionEntity[];
    createdAt:string;
    category?:string;
    updatedAt:string;
};
export type RolesListParams = {
    page?: number;
    limit?: number;
    search?: string;
    category?:string;
}

export type RolesListResponse = ServiceResponse<RoleEntity[]>;
export type RoleResponse = ServiceResponse<RoleEntity>;

export type RoleCreateRequest = {
    name:string;
    description:string;
    permissionIds?:string[];
    category?:string;
}
export type RoleUpdateRequest = Partial<RoleCreateRequest>;

export const roleApi = {
    // Fetch all roles with optional filters
    list: async (params: RolesListParams={}): Promise<RolesListResponse> => {
        const { data } = await client.get('/roles', { params });
        return data;
    },
    getById: async (roleId: string): Promise<RoleResponse> => {
        const { data } = await client.get(`/roles/${roleId}`);
        return data;
    },
    create: async (payload: RoleCreateRequest): Promise<RoleResponse> => {
        const { data } = await client.post('/roles', payload);
        return data;
    },
    update: async (roleId: string, payload: RoleUpdateRequest): Promise<RoleResponse> => {
        const { data } = await client.put(`/roles/${roleId}`, payload);
        return data;
    },
    remove: async (roleId: string): Promise<{ message: string }> => {
        const { data } = await client.delete(`/roles/${roleId}`);
        return data;
    },
    addPermission: async (roleId: string, permissionId: string): Promise<RoleResponse> => {
        const { data } = await client.post(`/roles/${roleId}/permissions/${permissionId}`);
        return data;
    },
    removePermission: async (roleId: string, permissionId: string): Promise<RoleResponse> => {
        const { data } = await client.delete(`/roles/${roleId}/permissions/${permissionId}`);
        return data;
    },
};
