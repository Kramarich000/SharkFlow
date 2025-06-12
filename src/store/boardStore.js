import { create } from 'zustand';
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

  getBoards: async (token) => {
    const boards = await getBoards(token);
    if (boards) {
      set({ boards, isLoaded: true });
    }
  },

  createBoard: async (token) => {
    const { title, color } = get();
    const newBoard = await createBoard(token, { title, color });
    if (newBoard) {
      set((state) => ({
        boards: [...state.boards, newBoard],
        title: '',
        color: '#000000',
        isCreateBoardModalOpen: false,
      }));
      get().handleBoardSelect(newBoard);
      return true;
    }
    return false;
  },

  updateBoard: async (token) => {
    const { selectedBoard, newTitle, newColor } = get();
    const hasTitleChanged = selectedBoard?.title !== newTitle;
    const hasColorChanged = selectedBoard?.color !== newColor;

    if (!hasTitleChanged && !hasColorChanged) {
      set({ isEditing: false });
      return false;
    }

    const updatedData = await updateBoard(token, selectedBoard?.uuid, {
      title: newTitle,
      color: newColor,
    });

    if (updatedData) {
      const updatedBoard = { ...selectedBoard, ...updatedData };
      set((state) => ({
        boards: state.boards.map((b) =>
          b.uuid === updatedBoard.uuid ? updatedBoard : b,
        ),
        selectedBoard: updatedBoard,
        newTitle: updatedBoard.title,
        newColor: updatedBoard.color,
        isEditing: false,
      }));
      return true;
    } else {
      set({ isEditing: false });
      return false;
    }
  },

  deleteBoard: async (token) => {
    const { selectedBoard } = get();
    if (!selectedBoard?.uuid) {
      return false;
    }

    const deleted = await deleteBoard(token, selectedBoard.uuid);
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
