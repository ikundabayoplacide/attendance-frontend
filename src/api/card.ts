import { client } from "./clients";

interface ServiceResponse<T> {
    success: boolean;
    message: string;
    result:T;
    page?: number;
    pageSize?: number;
    total?: number;
}

export type CardEntry = {
    id: string;
    cardNumber: string;
    location?:string;
    description?: string;
    branch?: string;
    status: 'assigned' | 'available'|'maintenance';
    assignedAt?:string;
    assignedTo?:string;
    lastUsed?:string;
    createdAt?:string;
    updatedAt?:string;
};

export const cardApi = {
    getAllCards: async (page: number,pageSize: number): Promise<ServiceResponse<CardEntry[]>> => {
        const response = await client.get('/cards', {params: { page, pageSize }});
        return response.data;
    },

    getCardById: async (id: string): Promise<ServiceResponse<CardEntry>> => {
        const response = await client.get(`/cards/${id}`);
        return response.data;
    },

    createCard: async (cardData: Omit<CardEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceResponse<CardEntry>> => {
        const response = await client.post('/cards', cardData);
        return response.data;
    },

    updateCard: async (id: string, cardData: Partial<CardEntry>): Promise<ServiceResponse<CardEntry>> => {
        const response = await client.put(`/cards/${id}`, cardData);
        return response.data;
    },

    deleteCard: async (id: string): Promise<ServiceResponse<void>> => {
        const response = await client.delete(`/cards/${id}`);
        return response.data;
    }
};