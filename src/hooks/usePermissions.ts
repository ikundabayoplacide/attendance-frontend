
import { toast } from 'react-toastify';
import { PermissionCreateRequest, PermissionResponse, permissionsApi, PermissionsListResponse, UpdatePermissionsRequest } from '../api/permissions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
//Query keys for Permissions
export const permissionsKeys = {
    all: ['permissions'] as const,
    lists: () => [...permissionsKeys.all, 'list'] as const,
    details: (id: string) => [...permissionsKeys.all, 'details', id] as const,
};

// List all permissions
export function usePermissionsList() {
    return useQuery<PermissionsListResponse>({
        queryKey: permissionsKeys.lists(),
        queryFn: () => permissionsApi.list(),
    })
}

//Get single permission by id 
export function usePermission(permissionId: string, enabled: boolean = true) {
    return useQuery<PermissionResponse>({
        queryKey: permissionsKeys.details(permissionId),
        queryFn: () => permissionsApi.getById(permissionId),
        enabled: !!permissionId && enabled,
    })
}

//Create permissions
export function useCreatePermission() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PermissionCreateRequest) => permissionsApi.create(data),
        onSuccess: async () => {
            toast.success('Permission created successfully', { autoClose: 1000 });
            //clear form
            
            await queryClient.invalidateQueries({ queryKey: permissionsKeys.lists() });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create permission';
            toast.error(errorMessage);
        }
    });
}

// Update permission
export function useUpdatePermission(permissionId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdatePermissionsRequest) => permissionsApi.update(permissionId, data),
        onSuccess: async () => {
            toast.success('Permission updated successfully', { autoClose: 1000 });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: permissionsKeys.all }),
                queryClient.invalidateQueries({ queryKey: permissionsKeys.details(permissionId) })]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update permission';
            toast.error(errorMessage);
        }
    });
}

//Delete permission
export function useDeletePermission() {
    const queryCLient = useQueryClient();
    return useMutation({
        mutationFn: (permissionId: string) => permissionsApi.remove(permissionId),
        onSuccess: async (__data, permissionId) => {
            toast.success('Permission deleted successfully', { autoClose: 1000 });
            await Promise.all([
                queryCLient.invalidateQueries({
                    queryKey: permissionsKeys.all
                }),
                queryCLient.invalidateQueries({
                    queryKey: permissionsKeys.details(permissionId)
                })]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete permission';
            toast.error(errorMessage);
        }
    })
}