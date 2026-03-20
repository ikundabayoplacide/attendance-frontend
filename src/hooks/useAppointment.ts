import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { AppointmentCreateRequest, AppointmentUpdateRequest, appointmentsApi } from '../api/appointment';



export const appointmentKeys = {
    all: ['appointments'] as const,
    lists: () => [...appointmentKeys.all, 'list'] as const,
    details: (id: string) => [...appointmentKeys.all, 'details', id] as const,
    byDate: (date: string) => [...appointmentKeys.all, 'date', date] as const,
    byUser: (userId: string) => [...appointmentKeys.all, 'user', userId] as const,
    byStatus: (status: string) => [...appointmentKeys.all, 'status', status] as const,
    byDepartment: (department: string) => [...appointmentKeys.all, 'department', department] as const,
    byHost: (host: string) => [...appointmentKeys.all, 'host', host] as const,
    byTime: (time: string) => [...appointmentKeys.all, 'time', time] as const,
    byLocation: (location: string) => [...appointmentKeys.all, 'location', location] as const,
    byDateRange: (startDate: string, endDate: string) => [...appointmentKeys.all, 'date-range', startDate, endDate] as const,
    byUserAndDateRange: (userId: string, startDate: string, endDate: string) => [...appointmentKeys.all, 'user-date-range', userId, startDate, endDate] as const,
};

// get all appointments
export function useGetAppointments() {
    return useQuery({
        queryKey: appointmentKeys.lists(),
        queryFn: () => appointmentsApi.getAll(),
    });
}

// get appointment by id
export function useGetAppointmentById(id: string) {
    return useQuery({
        queryKey: appointmentKeys.details(id),
        queryFn: () => appointmentsApi.getOne(id),
        enabled: !!id,
    });
}

// get appointments by user
export function useGetAppointmentsByUser(userId: string) {
    return useQuery({
        queryKey: appointmentKeys.byUser(userId),
        queryFn: () => appointmentsApi.getByUser(userId),
        enabled: !!userId,
    });
}

// get appointments by date
export function useGetAppointmentsByDate(date: string) {
    return useQuery({
        queryKey: appointmentKeys.byDate(date),
        queryFn: () => appointmentsApi.getByDate(date),
        enabled: !!date,
    });
}

// get appointments by department
export function useGetAppointmentsByDepartment(department: string) {
    return useQuery({
        queryKey: appointmentKeys.byDepartment(department),
        queryFn: () => appointmentsApi.getByDepartment(department),
        enabled: !!department,
    });
}

// get appointments by host
export function useGetAppointmentsByHost(host: string) {
    return useQuery({
        queryKey: appointmentKeys.byHost(host),
        queryFn: () => appointmentsApi.getByHost(host),
        enabled: !!host,
    });
}

// get appointments by time
export function useGetAppointmentsByTime(time: string) {
    return useQuery({
        queryKey: appointmentKeys.byTime(time),
        queryFn: () => appointmentsApi.getByTime(time),
        enabled: !!time,
    });
}

// get appointments by Location
export function useGetAppointmentsByLocation(location: string) {
    return useQuery({
        queryKey: appointmentKeys.byLocation(location),
        queryFn: () => appointmentsApi.getByLocation(location),
        enabled: !!location,
    });
}

//Confirm Appointment
export function useConfirmAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentsApi.confirm(id),
        onSuccess: async () => {
            toast.success('Appointment confirmed successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to confirm the appointment');
        }
    });
}

//cancel appointment
export function useCancelAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentsApi.cancel(id),
        onSuccess: async () => {
            toast.success('Appointment cancelled successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to cancel the appointment');
        }
    });
}

//onhold appointment
export function useOnHoldAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentsApi.onhold(id),
        onSuccess: async () => {
            toast.success('Appointment put on hold successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to put the appointment on hold');
        }
    });
}

//complete appointment
export function useCompleteAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentsApi.complete(id),
        onSuccess: async () => {
            toast.success('Appointment completed successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to complete the appointment');
        }
    });
}

//create appointment
export function useCreateAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: AppointmentCreateRequest) => appointmentsApi.create(payload),
        onSuccess: async () => {
            toast.success('Appointment created successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to create the appointment');
        }
    });
}

//update appointment
export function useUpdateAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: AppointmentUpdateRequest }) => appointmentsApi.update(id, payload),
        onSuccess: async () => {
            toast.success('Appointment updated successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to update the appointment');
        }
    });
}

//delete appointment
export function useDeleteAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentsApi.delete(id),
        onSuccess: async () => {
            toast.success('Appointment deleted successfully');
            await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
        },
        onError: () => {
            toast.error('Failed to delete the appointment');
        }
    });
}
