import { AttendanceApi, AttendanceResponse, UpdateAttendanceRecord, AttendanceRecord } from "../api/attendance";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";

// Define the correct type for list response
type AttendanceListResponse = {
    success: boolean;
    message: string;
    result: AttendanceRecord[];
    page?: number;
    pageSize?: number;
    total?: number;
};

//Query keys for Attendance
export const attendanceKeys = {
    all: ['attendance'] as const,
    lists: () => [...attendanceKeys.all, 'list'] as const,
    details: (id: string) => [...attendanceKeys.all, 'details', id] as const,
    byUser: (userId: string) => [...attendanceKeys.all, 'user', userId] as const,
    byDate: (date: string) => [...attendanceKeys.all, 'date', date] as const,
    byDateRange: (startDate: string, endDate: string) => [...attendanceKeys.all, 'range', startDate, endDate] as const,
    byUserAndDateRange: (userId: string, startDate: string, endDate: string) => [...attendanceKeys.all, 'user', userId, 'range', startDate, endDate] as const,
};

// All attendances
export function useAttendanceList(){
    return useQuery<AttendanceListResponse>({
        queryKey:attendanceKeys.lists(),
        queryFn:()=>AttendanceApi.list(),
    })

}

//single attendance
export function useGetSingleAttendance(id:string,enabled: boolean = true){
 return useQuery<AttendanceResponse>({
     queryKey:attendanceKeys.details(id),
     queryFn:()=>AttendanceApi.getById(id),
     enabled:enabled && !!id,
 })
}

// get attendance record by user
export function useGetAttendanceByUserId(userId:string){
    return useQuery<AttendanceListResponse>({
        queryKey: attendanceKeys.byUser(userId),
        queryFn: () => AttendanceApi.getByUserId(userId),
        enabled: !!userId,
    })
}

// get attendance record by date
export function useGetAttendanceByDate(date:string){
    return useQuery<AttendanceListResponse>({
        queryKey: attendanceKeys.byDate(date),
        queryFn: () => AttendanceApi.getByDate(date),
        enabled: !!date,
    })
}

// get attendance records in given range of time
export function useGetAttendanceByDateRange(startDate:string,endDate:string){
    return useQuery<AttendanceListResponse>({
        queryKey: attendanceKeys.byDateRange(startDate, endDate),
        queryFn: () => AttendanceApi.getByDateRange(startDate, endDate),
        enabled: !!startDate && !!endDate,
    })
}

// get attendances records of user in given range of time
export function useGetAttendanceByUserAndDateRange(userId:string, startDate:string, endDate:string){
    return useQuery<AttendanceListResponse>({
        queryKey: attendanceKeys.byUserAndDateRange(userId, startDate, endDate),
        queryFn: () => AttendanceApi.getByUserAndDateRange(userId, startDate, endDate),
        enabled: !!userId && !!startDate && !!endDate,
    })
}

//checkout
export function useCheckout(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id, data}: {id: string, data?: {note?: string}})=>AttendanceApi.checkout(id, data),
        onSuccess:async()=>{
            toast.success('User checked out successfully');
            await queryClient.invalidateQueries({queryKey:attendanceKeys.lists()});
            queryClient.invalidateQueries({queryKey:attendanceKeys.all});
        },
        onError:()=>{
            toast.error('Failed to checkout user');
        }
    })
}
// update attendance record
export function useUpdateAttendance(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id, payload}:{id:string, payload:UpdateAttendanceRecord})=>AttendanceApi.update(id, payload),
        onSuccess:async()=>{
            await queryClient.invalidateQueries({queryKey:attendanceKeys.lists()})
            queryClient.invalidateQueries({queryKey:attendanceKeys.all});
        },
        onError:()=>{
            toast.error('Failed to update the attendance record');
        }
    })
}

//delete attendance record
export function useDeleteAttendance(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>AttendanceApi.remove(id),
        onSuccess:async()=>{
            toast.success('Attendance record deleted successfully');
            await queryClient.invalidateQueries({queryKey:attendanceKeys.lists()})
            queryClient.invalidateQueries({queryKey:attendanceKeys.all});
        },
        onError:()=>{
            toast.error('Failed to delete the attendance record');
        }
    })
}
