import { client } from "./clients";

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result:T;
    page?: number;
    pageSize?: number;
    total?: number;
}


export type AppointmentCreateRequest = {
    userId: string;
    purpose: string;
    host: string;
    status?: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    department: string;
    company: string;
    appointmentDate: string;
    appointmentTime: string;
    timeDuration: string;
    appointmentLocation: string;
    note:string
}

export type AppointmentUpdateRequest = {
    userId?: string;
    purpose?: string;
    status?: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    host?: string;
    department?: string;
    company?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    timeDuration?: string;
    appointmentLocation?: string;
    note?:string;
}

export type AppointmentListResponse=ServiceResponse<AppointmentCreateRequest[]>
export type AppointmentResponse=ServiceResponse<AppointmentCreateRequest>

export const appointmentsApi={
    getAll:async(page=1,limit=10,search?:string):Promise<AppointmentListResponse>=>{
        const response=await client.get('/appointments',{
            params:{page,limit,search}
        });
        return response.data;
    },
     create:async(payload:AppointmentCreateRequest):Promise<AppointmentResponse>=>{
        const response=await client.post('/appointments',payload);
        return response.data;
    },
    getOne:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.get(`/appointments/${id}`);
        return response.data;
    },
    // get appointments for a specific user
    getByUser:async(userId:string, page=1, limit=10):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/user/${userId}`,{
            params:{page,limit}
        });
        return response.data;
    },

    // Get appointments based on date
    getByDate:async(date:string):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/date/${date}`);
        return response.data;
    },

    //appointments for a specific department
    getByDepartment:async(departmentId:string):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/department/${departmentId}`);
        return response.data;
    },

   //Get appointments for a specific host
   getByHost:async(hostId:string):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/host/${hostId}`);
        return response.data;
    },
    //Get appointment by time
    getByTime:async(time:string):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/time/${time}`);
        return response.data;
    },

    //Get appointment by location
    getByLocation:async(location:string):Promise<AppointmentListResponse>=>{
        const response=await client.get(`/appointments/location/${location}`);
        return response.data;
    },

    //confirm appointment
    confirm:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.put(`/appointments/confirm/${id}`);
        return response.data;
    },

    //cancel appointment
    cancel:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.put(`/appointments/cancel/${id}`);
        return response.data;
    },

  //onHold appointment
    onhold:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.put(`/appointments/onhold/${id}`);
        return response.data;
    },

    //complete appointment
    complete:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.put(`/appointments/complete/${id}`);
        return response.data;
    }, 

    update:async(id:string,payload:AppointmentUpdateRequest):Promise<AppointmentResponse>=>{
        const response=await client.put(`/appointments/${id}`,payload);
        return response.data;
    },
    delete:async(id:string):Promise<AppointmentResponse>=>{
        const response=await client.delete(`/appointments/${id}`);
        return response.data;
    }


}