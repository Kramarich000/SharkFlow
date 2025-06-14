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

  setNewIsPinned: (newIsPinned) => set({ newIsPinned }),
  setNewIsFavorite: (newIsFavorite) => set({ newIsFavorite }),
  setBoards: (boards) => set({ boards }),
  setSelectedBoard: (board) => set({ selectedBoard: board }),
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

  updateBoard: async ({ uuid, title, color, isPinned, isFavorite }) => {
    if (!uuid) return false;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (color !== undefined) updatedFields.color = color;
    if (isPinned !== undefined) updatedFields.isPinned = isPinned;
    if (isFavorite !== undefined) updatedFields.isFavorite = isFavorite;
    if (Object.keys(updatedFields).length === 0) {
      set({ isEditing: false });
      return false;
    }

    const updatedData = await updateBoard(uuid, updatedFields);
    // console.log(updatedData);

    if (updatedData) {
      set((state) =>
        produce(state, (draft) => {
          const board = draft.boards.find((b) => b.uuid === uuid);
          if (!board) return;

          Object.assign(board, updatedData);

          if (draft.selectedBoard?.uuid === uuid) {
            draft.selectedBoard = { ...board };
            draft.newTitle = board.title;
            draft.newColor = board.color;
            draft.newIsPinned = board.isPinned;
            draft.newIsFavorite = board.isFavorite;
          }

          draft.isEditing = false;
        }),
      );
      return true;
    }
    set({ isEditing: false });
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
