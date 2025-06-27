import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoard as createBoardApi } from '../api';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardApi,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
}; 