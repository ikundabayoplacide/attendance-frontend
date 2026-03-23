import { client } from "./clients";

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result:T;
    page?: number;
    pageSize?: number;
    total?: number;
}

export type EquipmentEntity={
    id: string;
    name:string;
    serialNumber:string;
    description?:string;
    status:'available'|'inuse'|'maintenance'|'damaged'|'lost';
    quantity?:number;
    assignedTo?: string | null;
}

export type EquipmentCreateRequest=Omit<EquipmentEntity,'id'>
export type EquipmentUpdateRequest=Partial<EquipmentEntity>

export type EquipmentListResponse=ServiceResponse<EquipmentEntity[]>
export type EquipmentResponse=ServiceResponse<EquipmentEntity>

export const EquipmentApi={
    getAll:async():Promise<EquipmentListResponse>=>{
        const response=await client.get('/equipments');
        return response.data;
    },
    create:async(payload:EquipmentCreateRequest):Promise<EquipmentResponse>=>{
        const response=await client.post('/equipments',payload);
        return response.data;
    },
    getOne:async(equipmentId:string):Promise<EquipmentResponse>=>{
        const response=await client.get(`/equipments/${equipmentId}`);
        return response.data;
    },
    assignToUser:async(equipmentId:string,userId:string):Promise<EquipmentResponse>=>{
        const response=await client.put(`/equipments/${equipmentId}/assign`, { userId });
        return response.data;
    },
    returnFromUser:async(equipmentId:string, userId:string):Promise<EquipmentResponse>=>{
        const response=await client.put(`/equipments/${equipmentId}/return/${userId}`);
        return response.data;
    },

    update:async(equipmentId:string,payload:EquipmentUpdateRequest):Promise<EquipmentResponse>=>{
        const response=await client.put(`/equipments/${equipmentId}`,payload);
        return response.data;
    },
    delete:async(equipmentId:string):Promise<EquipmentResponse>=>{
        const response=await client.delete(`/equipments/${equipmentId}`);
        return response.data;
    }
}