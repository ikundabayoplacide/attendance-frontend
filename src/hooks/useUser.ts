import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userApi, UserCreateRequest } from '../api/user';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    details: (id: string) => [...userKeys.all, 'details', id] as const,
};

// Get all users
export function useGetUsers() {
    return useQuery({
        queryKey: userKeys.lists(),
        queryFn: () => userApi.getAllUsers()
    });
}

// Get single user
export function useGetUser(id: string) {
    return useQuery({
        queryKey: userKeys.details(id),
        queryFn: () => userApi.getUserById(id),
        enabled: !!id
    });
}

// Create user
export function useCreateUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userData: UserCreateRequest) => userApi.createUser(userData),
        onSuccess: async (data) => {
            const message = data.result?.isNewUser 
                ? 'User registered and attendance recorded successfully' 
                : 'Attendance recorded successfully';
            toast.success(message, { autoClose: 2000 });
            await queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create user';
            toast.error(errorMessage);
            console.error('User creation error:', error);
        }
    });
}

// Update user
export function useUpdateUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, userData }: { id: string; userData: any }) => 
            userApi.updateUser(id, userData),
        onSuccess: async (data, { id }) => {
            toast.success('User updated successfully', { autoClose: 1000 });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: userKeys.all }),
                queryClient.invalidateQueries({ queryKey: userKeys.details(id) })
            ]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update user';
            toast.error(errorMessage);
        }
    });
}

// Delete user
export function useDeleteUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => userApi.deleteUser(id),
        onSuccess: async (data, id) => {
            toast.success('User deleted successfully', { autoClose: 1000 });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: userKeys.all }),
                queryClient.invalidateQueries({ queryKey: userKeys.details(id) })
            ]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete user';
            toast.error(errorMessage);
        }
    });
}

// Suspend user
export function useSuspendUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => userApi.suspendUser(id),
        onSuccess: async (data, id) => {
            toast.success('User suspended successfully', { autoClose: 1000 });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: userKeys.all }),
                queryClient.invalidateQueries({ queryKey: userKeys.details(id) })
            ]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to suspend user';
            toast.error(errorMessage);
        }
    });
}

// Activate user
export function useActivateUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => userApi.activateUser(id),
        onSuccess: async (data, id) => {
            toast.success('User activated successfully', { autoClose: 1000 });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: userKeys.all }),
                queryClient.invalidateQueries({ queryKey: userKeys.details(id) })
            ]);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to activate user';
            toast.error(errorMessage);
        }
    });
}