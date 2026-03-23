import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { cardApi, CardEntry } from '../api/card';

export const cardKeys={
    all:['cards'] as const,
    lists:() => [...cardKeys.all,'list'] as const,
    details:(id:string) => [...cardKeys.all,'details',id] as const,
}

//list of all cards
export function useGetCards(page: number = 1, pageSize: number = 10){
    return useQuery({
        queryKey:cardKeys.lists(),
        queryFn:() => cardApi.getAllCards(page, pageSize)
    })
}

//get single card
export function useGetSingleCard(id:string){
    return useQuery({
        queryKey:cardKeys.details(id),
        queryFn:() => cardApi.getCardById(id),
        enabled:!!id
    })
}

//create new card
export function useCreateCard(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:cardApi.createCard,
        onSuccess:async()=>{
            toast.success('Card created successfully',{autoClose:1000});
            await queryClient.invalidateQueries({queryKey:cardKeys.all})
        },
        onError:(error:any)=>{
            const errorMessage=error?.response?.data?.message|| error?.message|| 'Failed to create card';
            toast.error(errorMessage);
        }
    })
}

//update card
export function useUpdateCard(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:{id:string;cardData:Partial<CardEntry>})=>cardApi.updateCard(data.id,data.cardData),
        onSuccess:async(_data,{id})=>{
            toast.success('Card updated successfully', {autoClose:1000});
            await Promise.all([
                queryClient.invalidateQueries({queryKey:cardKeys.all}),
                queryClient.invalidateQueries({queryKey:cardKeys.details(id)})
            ])
        },
        onError:(error:any)=>{
            const errorMessage=error?.response?.data?.message|| error?.message|| 'Failed to update card';
            toast.error(errorMessage);
        }
    })
}
//assign Card ToUser
export function useAssignCardToUser(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({cardId, userId}: {cardId: string, userId: string})=>cardApi.assignCardToUser(cardId,userId),
        onSuccess:async()=>{
            toast.success('Card assigned successfully', {autoClose:1000});
            await queryClient.invalidateQueries({queryKey:cardKeys.all})
        },
        onError:(error:any)=>{
             const errorMessage=error?.response?.data?.message|| error?.message|| 'Failed to assign card to user';
            toast.error(errorMessage);
        }
    })
}

//Return Card From User
export function useReturnCardFromUser(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({cardId, userId}: {cardId: string, userId: string})=>cardApi.returnCardFromUser(cardId,userId),
        onSuccess:async()=>{
            toast.success('Card returned successfully', {autoClose:1000});
            await queryClient.invalidateQueries({queryKey:cardKeys.all})
        },
        onError:(error:any)=>{
             const errorMessage=error?.response?.data?.message|| error?.message|| 'Failed to return card from user';
            toast.error(errorMessage);
        }
    })
}
//delete card
export function useDeleteCard(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:cardApi.deleteCard,
        onSuccess:async(_data,id)=>{
            toast.success('Card deleted successfully', {autoClose:1000});
            await Promise.all([
                queryClient.invalidateQueries({queryKey:cardKeys.all}),
                queryClient.invalidateQueries({queryKey:cardKeys.details(id)})
            ])
        },
        onError:(error:any)=>{
            const errorMessage=error?.response?.data?.message|| error?.message|| 'Failed to delete card';
            toast.error(errorMessage);
        }
    })
}