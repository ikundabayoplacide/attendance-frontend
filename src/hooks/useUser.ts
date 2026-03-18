import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCreateRequest, usersApi } from "../api/user";
import { toast } from "react-toastify";

//Get all users
export function GetAllUser(){
    return useQuery ({
        queryKey: ['users'],
        queryFn: () =>usersApi.getAll()
    })
}

//Get single user
export function GetUserById(userId: string){
    return useQuery ({
        queryKey: ['users', userId],
        queryFn: () => usersApi.getById(userId)
    })
}

//create user
export function CreateUser(){
    const queryClient = useQueryClient();
    
   return useMutation({
        mutationFn: (newUser: Omit<UserCreateRequest, 'id'>) => usersApi.create(newUser),
        onSuccess:async () => {
            await queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('New User created successfully',{autoClose:2000});
        },
        onError:(error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create new user';
            toast.error(errorMessage);
        }

   })
}
//update user
export function UpdateUser(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, ...rest}: Partial<UserCreateRequest> & {id:string}) => usersApi.update(id, rest),
        onSuccess:async () => {
            await queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('user updated successfully', {autoClose:2000});
        },
        onError:(error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update user';
            toast.error(errorMessage);
        }   
    })
}
// to activate user
export function activate(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn:(userId:string)=>usersApi.activate(userId),
        onSuccess:async()=>{
            await queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User activated successfully',{autoClose:2000});
        },
        onError:(error:any)=>{
            const ErrorMessage=error?.response?.data?.message||error?.message||'Failed to activate user';
            toast.error(ErrorMessage);
        }
        
    })
}
// Suspend user
export function suspendUser(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(userId:string)=>usersApi.suspend(userId),
        onSuccess:async()=>{
            await queryClient.invalidateQueries({queryKey:['users']});
            toast.success('User suspended successfully', {autoClose:2000});
        },
        onError:(error:any)=>{
            const ErrorMessage=error?.response?.data?.message||error?.message||'Failed to suspend user';
            toast.error(ErrorMessage);
        }
    })
}

//delete user
export function DeleteUser(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: string) => usersApi.remove(userId),
        onSuccess:async () => {
            await queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('user deleted successfully', {autoClose:2000});
        },
        onError:(error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete user';
            toast.error(errorMessage);
    }})
}