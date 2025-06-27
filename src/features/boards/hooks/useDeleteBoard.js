import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard as deleteBoardApi } from '../api';

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardApi, 

    onMutate: async (deletedBoardId) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] });

      const previousBoards = queryClient.getQueryData(['boards']);

      queryClient.setQueryData(['boards'], (oldData) =>
        oldData?.filter((board) => board.uuid !== deletedBoardId),
      );

      return { previousBoards };
    },

    onError: (err, variables, context) => {
      if (context.previousBoards) {
        queryClient.setQueryData(['boards'], context.previousBoards);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
}; 