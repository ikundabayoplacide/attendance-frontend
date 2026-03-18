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

export type UpdateAttendanceRecord={
    status?: 'present' | 'late' | 'left_early' | 'absent';
    note?: string;
    checkOut?: Date;
    checkIn?: Date;
}

export type AttendanceRecord={
    id:string;
    userId: string;
    checkIn: Date;
    checkOut?: Date;
    hoster?: string;
    badge?: string;
    date: string;
    status: string;
    note?: string;
    user?: {
        fullName: string;
        email: string;
        department: string;
        nationalId: string;
        category: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
export type AttendanceResponse=ServiceResponse<AttendanceRecord>

export const AttendanceApi={
    // Fetch all attendance records
    list:async():Promise<ServiceResponse<AttendanceRecord[]>>=>{
        const {data}=await client.get('/attendance');
        return data;
    },
    //get single attendance
    getById:async(id:string):Promise<ServiceResponse<AttendanceRecord>>=>{
        const {data}=await client.get(`/attendance/${id}`);
        return data;
    },

   // get attendance record by user
   getByUserId:async(userId:string):Promise<ServiceResponse<AttendanceRecord[]>>=>{
        const {data}=await client.get(`/attendance/by-user/${userId}`);
        return data;
    },
    // get attendance record by date
    getByDate:async(date:string):Promise<ServiceResponse<AttendanceRecord[]>>=>{
        const {data}=await client.get(`/attendance/by-date/${date}`);
        return data;
    },
     
    //get attendance records in given range of time
    getByDateRange:async(startDate:string,endDate:string):Promise<ServiceResponse<AttendanceRecord[]>>=>{
        const {data}=await client.get(`/attendance/report/range/${startDate}/${endDate}`);
        return data;
    },

    // get attendances records of user in given range of time
    getByUserAndDateRange:async(userId:string,startDate:string, endDate:string):Promise<ServiceResponse<AttendanceRecord[]>>=>{
        const {data}=await client.get(`/attendance/report/user/${userId}/${startDate}/${endDate}`);
        return data;
    },

    //checkout
    checkout:async(id:string, data?: {note?: string}):Promise<ServiceResponse<AttendanceRecord>>=>{
        const {data: response}=await client.put(`/attendance/${id}/checkout`, data || {});
        return response;
    },

    // update attendance record
    update:async(id:string,payload:UpdateAttendanceRecord):Promise<ServiceResponse<AttendanceRecord>>=>{
        const {data}=await client.put(`/attendance/${id}`,payload);
        return data;
    },

    // delete attendance record
    remove:async(id:string):Promise<ServiceResponse<AttendanceRecord>>=>{
        const {data}=await client.delete(`/attendance/${id}`);
        return data;
    }
}