import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EquipmentApi, EquipmentCreateRequest, EquipmentUpdateRequest } from '../api/equipement';

export const useEquipments = () => {
  return useQuery({
    queryKey: ['equipments'],
    queryFn: EquipmentApi.getAll,
  });
};

export const useEquipment = (equipmentId: string) => {
  return useQuery({
    queryKey: ['equipment', equipmentId],
    queryFn: () => EquipmentApi.getOne(equipmentId),
    enabled: !!equipmentId,
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: EquipmentCreateRequest) => EquipmentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
    },
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ equipmentId, data }: { equipmentId: string; data: EquipmentUpdateRequest }) =>
      EquipmentApi.update(equipmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
    },
  });
};

export const useAssignEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ equipmentId, userId }: { equipmentId: string; userId: string }) =>
      EquipmentApi.assignToUser(equipmentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
    },
  });
};

export const useReturnEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ equipmentId, userId }: { equipmentId: string; userId: string }) =>
      EquipmentApi.returnFromUser(equipmentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
    },
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (equipmentId: string) => EquipmentApi.delete(equipmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
    },
  });
};