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
  isOpen: false,
  isCreateBoardModalOpen: false,
  isDeleteBoardModalOpen: false,
  isEditing: false,
  title: '',
  color: '#000',
  newTitle: '',
  newColor: '',
  newIsPinned: false,
  newIsFavorite: false,

  // setNewIsPinned: (newIsPinned) => set({ newIsPinned }),
  // setNewIsFavorite: (newIsFavorite) => set({ newIsFavorite }),
  // setBoards: (boards) => set({ boards }),
  // setSelectedBoard: (board) => set({ selectedBoard: board }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setIsCreateBoardModalOpen: (isOpen) =>
    set({ isCreateBoardModalOpen: isOpen }),
  setIsDeleteBoardModalOpen: (isOpen) =>
    set({ isDeleteBoardModalOpen: isOpen }),
  setisEditing: (isEditing) => set({ isEditing }),
  setTitle: (title) => set({ title }),
  setColor: (color) => set({ color }),
  setNewTitle: (newTitle) => set({ newTitle }),
  setNewColor: (newColor) => set({ newColor }),

  getBoards: async () => {
    const boards = await getBoards();
    if (boards) {
      set({ boards, isLoaded: true });
    }
  },

  createBoard: async () => {
    const { title, color } = get();
    const newBoard = await createBoard({ title, color });

    if (newBoard) {
      set((state) => {
        const boards = [...state.boards];
        const tNew = new Date(newBoard.updatedAt);

        let left = 0,
          right = boards.length;
        while (left < right) {
          const mid = (left + right) >>> 1;
          const tMid = new Date(boards[mid].updatedAt);
          if (tMid < tNew) right = mid;
          else left = mid + 1;
        }
        boards.splice(left, 0, newBoard);

        return {
          boards,
          title: '',
          color: '#000000',
          isCreateBoardModalOpen: false,
        };
      });

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
      return null;
    }
  },

  applyBoardUpdate: (updatedData) => {
    set((state) =>
      produce(state, (draft) => {
        const board = draft.boards.find((b) => b.uuid === updatedData.uuid);
        if (!board) return;
        if (!updatedData.updatedAt) {
          updatedData.updatedAt = new Date().toISOString();
        }
        Object.assign(board, updatedData);

        if (draft.selectedBoard?.uuid === updatedData.uuid) {
          const b = board;
          draft.selectedBoard = { ...b };
          draft.newTitle = b.title;
          draft.newColor = b.color;
          draft.newIsPinned = b.isPinned;
          draft.newIsFavorite = b.isFavorite;
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
    set({ isEditing: false });

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
          isDeleteBoardModalOpen: false,
          selectedBoard: null,
          isOpen: false,
        };
      });
      return true;
    }
    return false;
  },

  handleBoardSelect: (board) => {
    set({
      selectedBoard: board,
      newTitle: board.title,
      newColor: board.color,
      newIsPinned: board.isPinned ?? false,
      newIsFavorite: board.isFavorite ?? false,
      isOpen: true,
      isEditing: false,
    });
  },

  reset: () =>
    set({
      boards: [],
      selectedBoard: null,
      isLoaded: false,
      isOpen: false,
      isCreateBoardModalOpen: false,
      isDeleteBoardModalOpen: false,
      isEditing: false,
      title: '',
      color: '#808080',
      newTitle: '',
      newColor: '',
    }),
}));

export default useBoardStore;
