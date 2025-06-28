import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBoard as updateBoardApi } from '../api';
import { useBoardStore } from '../store';

export const useBoardUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, data }) => updateBoardApi(uuid, data),

    onMutate: async ({ uuid, data }) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] });
      const previousBoards = queryClient.getQueryData(['boards']);
      queryClient.setQueryData(['boards'], (oldData) =>
        oldData?.map((board) =>
          board.uuid === uuid ? { ...board, ...data } : board,
        ),
      );
      return { previousBoards };
    },

    onError: (err, variables, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(['boards'], context.previousBoards);
      }
    },

    onSuccess: (updatedBoardData) => {
      const { selectedBoard, handleBoardSelect } = useBoardStore.getState();
      if (selectedBoard && selectedBoard.uuid === updatedBoardData.uuid) {
        const mergedBoard = { ...selectedBoard, ...updatedBoardData };
        handleBoardSelect(mergedBoard);
      }
    },

    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      if (data?.uuid) {
        queryClient.invalidateQueries({ queryKey: ['boards', data.uuid] });
      }
    },
  });
}; 