import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {roleApi, RoleResponse, RolesListParams, RolesListResponse } from "../api/role";
import { toast } from "react-toastify";


export type CreateRoleRequest={
    name:string;
    description?:string;
    category?:string;
    permissionIds?:string[];
}

export type UpdateRoleRequest=Partial<CreateRoleRequest>;

//Query keys for Roles
export const rolesKeys={
    all:['roles'] as const,
    list:(params?:RolesListParams)=>[
        ...rolesKeys.all,
        'list',
        params?.page?? 1,
        params?.limit?? 10,
        params?.search?? '',
        params?.category?? 'all'
    ] as const,
    details:(roleId:string)=>[
        ...rolesKeys.all,
        'detail',
        roleId
    ] as const,
}
    //List roles
    export function useRolesList(params:RolesListParams){
        return useQuery<RolesListResponse>({
            queryKey:rolesKeys.list(params),
            queryFn:()=>roleApi.list(params),
            placeholderData:keepPreviousData
        });
}

// Get sngle role by id
export function useRole(roleId:string,enable:boolean=true){
    return useQuery<RoleResponse>({
        queryKey:rolesKeys.details(roleId),
        queryFn:()=>roleApi.getById(roleId),
        enabled:enable
    });
}

//create role
export function useCreateRole(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:CreateRoleRequest)=>roleApi.create({
            name: data.name,
            description: data.description ?? '',
            category: data.category ?? '',
            permissionIds: data.permissionIds ?? []
        }),
        onSuccess:async()=>{
            toast.success('Role created successfully',{autoClose:2000});
           await queryClient.invalidateQueries({queryKey:rolesKeys.all});
        },
        onError:(error:any)=>{
            const message=error?.response?.data?.message|| error?.message ||'Failed to create role';
            toast.error('Failed to create role',{autoClose:2000});
            toast.error(message,{autoClose:2000});
        }
    });
}

//Update role
export function useUpdateRole(roleId:string){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:UpdateRoleRequest)=>roleApi.update(roleId,data),
        onSuccess:async()=>{
            toast.success('Role updated successfully', {autoClose:2000});
           await queryClient.invalidateQueries({queryKey:rolesKeys.all});
           await queryClient.invalidateQueries({queryKey:rolesKeys.details(roleId)});
        },
        onError:(error:any)=>{
            const message=error?.response?.data?.message|| error?.message ||'Failed to update role';
            toast.error('Failed to update role', {autoClose:2000});
            toast.error(message, {autoClose:2000});
        }
    })
}

//Delete role
export function useDeleteRole(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(roleId:string)=>roleApi.remove(roleId),
        onSuccess:async()=>{
            toast.success('Role deleted successfully', {autoClose:2000});
           await queryClient.invalidateQueries({queryKey:rolesKeys.all});
        },
        onError:(error:any)=>{
            const message=error?.response?.data?.message|| error?.message ||'Failed to delete role';
            toast.error('Failed to delete role', {autoClose:2000});
            toast.error(message, {autoClose:2000});
        }
    })
}
// Add permissions to role

export function useAddPermissionsToRole(roleId:string){
    const query=useQueryClient();
    return useMutation({
        mutationFn:(permissionId:string)=>roleApi.addPermission(roleId, permissionId),
        onSuccess:async()=>{
            toast.success('Permission added to role successfully', {autoClose:2000});
            await query.invalidateQueries({queryKey:rolesKeys.details(roleId)});
        },
        onError:(error:any)=>{
            const message=error?.response?.data?.message|| error?.message ||'Failed to add permission to role';
            toast.error(message, {autoClose:2000});
        }
    })
}
//Remove permission from role
export function useRemovePermissionFromRole(roleId:string){
    const query=useQueryClient();
    return useMutation({
        mutationFn:(permissionId:string)=>roleApi.removePermission(roleId, permissionId),
        onSuccess:async()=>{
            toast.success('Permission removed from role successfully', {autoClose:2000});
            await query.invalidateQueries({queryKey:rolesKeys.details(roleId)});
        },
        onError:(error:any)=>{
            const message=error?.response?.data?.message|| error?.message ||'Failed to remove permission from role';
            toast.error(message, {autoClose:2000});
        }
    })
}