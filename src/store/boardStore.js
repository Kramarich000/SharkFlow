import { create } from 'zustand';
import { produce } from 'immer';
import { getBoards } from '@api/http/boards/getBoards';
import { createBoard } from '@api/http/boards/createBoard';
import { updateBoard } from '@api/http/boards/updateBoard';
import { deleteBoard } from '@api/http/boards/deleteBoard';

const useBoardStore = create((set, get) => ({
  boards: [],
  selectedBoard: null,
  isLoaded: false,

  getBoards: async () => {
    const boards = await getBoards();
    if (boards) {
      set({ boards, isLoaded: true });
    }
  },

  createBoard: async ({ title, color }) => {
    const newBoard = await createBoard({ title, color });

    if (newBoard) {
      set(
        produce((state) => {
          const tNew = new Date(newBoard.updatedAt);
          let left = 0,
            right = state.boards.length;
          while (left < right) {
            const mid = (left + right) >>> 1;
            const tMid = new Date(state.boards[mid].updatedAt);
            if (tMid < tNew) right = mid;
            else left = mid + 1;
          }
          state.boards.splice(left, 0, newBoard);
        }),
      );
      get().handleBoardSelect(newBoard);
      return true;
    }

    return false;
  },

  updateBoardInApi: async (uuid, updatedFields) => {
    if (!uuid || Object.keys(updatedFields).length === 0) return null;
    try {
      return await updateBoard(uuid, updatedFields);
    } catch (err) {
      console.error('Failed to update board in API:', err);
      return null;
    }
  },

  applyBoardUpdate: (updatedData) => {
    set(
      produce((state) => {
        const board = state.boards.find((b) => b.uuid === updatedData.uuid);
        if (!board) return;
        if (!updatedData.updatedAt) {
          updatedData.updatedAt = new Date().toISOString();
        }
        Object.assign(board, updatedData);

        if (state.selectedBoard?.uuid === updatedData.uuid) {
          state.selectedBoard = { ...board };
        }
      }),
    );
  },

  updateBoard: async ({ uuid, title, color, isPinned, isFavorite }) => {
    if (!uuid) return false;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (color !== undefined) updatedFields.color = color;
    if (isPinned !== undefined) updatedFields.isPinned = isPinned;
    if (isFavorite !== undefined) updatedFields.isFavorite = isFavorite;
    if (Object.keys(updatedFields).length === 0) {
      return false;
    }

    const prev = get().boards.find((b) => b.uuid === uuid);
    const prevSnapshot = prev ? { ...prev } : null;

    get().applyBoardUpdate({ uuid, ...updatedFields });

    const updatedData = await get().updateBoardInApi(uuid, updatedFields);

    if (updatedData) {
      get().applyBoardUpdate(updatedData);
      return true;
    }

    if (prevSnapshot) {
      get().applyBoardUpdate(prevSnapshot);
    }
    return false;
  },

  deleteBoard: async () => {
    const { selectedBoard } = get();
    if (!selectedBoard?.uuid) {
      return false;
    }

    const deleted = await deleteBoard(selectedBoard.uuid);
    if (deleted) {
      set((state) => {
        const updatedBoards = state.boards.filter(
          (board) => board.uuid !== selectedBoard.uuid,
        );
        return {
          boards: updatedBoards,
          selectedBoard: null,
        };
      });
      return true;
    }
    return false;
  },

  handleBoardSelect: (board) => {
    set({
      selectedBoard: board,
    });
  },

  reset: () =>
    set({
      boards: [],
      selectedBoard: null,
      isLoaded: false,
    }),
}));

export default useBoardStore;
