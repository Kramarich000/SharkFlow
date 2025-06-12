import { create } from 'zustand';
import api from '@api/http/http';
import { showToast } from '@utils/toast';

const useBoardStore = create((set, get) => ({
  boards: [],
  selectedBoard: null,
  isLoaded: false,
  isOpen: false,
  isCreateBoardModalOpen: false,
  isEditingTitle: false,
  title: '',
  color: '#808080',
  newTitle: '',
  newColor: '',

  // Setters
  setBoards: (boards) => set({ boards }),
  setSelectedBoard: (board) => set({ selectedBoard: board }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setIsCreateBoardModalOpen: (isOpen) =>
    set({ isCreateBoardModalOpen: isOpen }),
  setIsEditingTitle: (isEditingTitle) => set({ isEditingTitle }),
  setTitle: (title) => set({ title }),
  setColor: (color) => set({ color }),
  setNewTitle: (newTitle) => set({ newTitle }),
  setNewColor: (newColor) => set({ newColor }),

  // Actions
  fetchBoards: async (token) => {
    try {
      const response = await api.get('/todo/boards', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        set({ boards: response.data.boards, isLoaded: true });
      }
    } catch (error) {
      console.error('Ошибка при загрузке досок', error);
      showToast('Ошибка при загрузке досок', 'error');
    }
  },

  createBoard: async (token) => {
    const { title, color } = get();

    if (!title.trim()) {
      showToast('Название не может быть пустым', 'error');
      return false;
    }
    if (!color.trim()) {
      showToast('Выберите цвет!', 'error');
      return false;
    }

    try {
      const response = await api.post(
        '/todo/createBoard',
        { title, color },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data && response.data.title && response.data.color) {
        set((state) => ({
          boards: [...state.boards, response.data],
          title: '',
          color: '#000000',
          isCreateBoardModalOpen: false,
        }));
        showToast('Доска успешно создана', 'success');
        get().handleBoardSelect(response.data);
        return true;
      }
    } catch (error) {
      console.error('Ошибка при создании доски:', error);
      showToast('Серверная ошибка', 'error');
    }
    return false;
  },

  updateBoard: async (token) => {
    const { selectedBoard, newTitle, newColor } = get();

    if (!selectedBoard?.uuid) {
      showToast('Ошибка: доска не выбрана', 'error');
      return false;
    }

    if (!newTitle || !newTitle.trim()) {
      showToast('Название доски не может быть пустым!', 'error');
      return false;
    }

    try {
      const response = await api.put(
        `/todo/editBoard/${selectedBoard.uuid}`,
        {
          title: newTitle.trim(),
          color: newColor.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        showToast('Доска успешно обновлена', 'success');

        set((state) => ({
          boards: state.boards.map((board) =>
            board.uuid === selectedBoard.uuid
              ? { ...board, title: newTitle.trim(), color: newColor.trim() }
              : board,
          ),
          selectedBoard: state.selectedBoard
            ? {
                ...state.selectedBoard,
                title: newTitle.trim(),
                color: newColor.trim(),
              }
            : state.selectedBoard,
          isEditingTitle: false,
        }));
        return true;
      }
    } catch (error) {
      console.error('Ошибка при обновлении названия доски:', error);
      showToast('Ошибка при обновлении названия доски', 'error');
      set({ isEditingTitle: false });
    }
    return false;
  },

  handleBoardSelect: (board) => {
    set({
      selectedBoard: board,
      newTitle: board.title,
      newColor: board.color,
      isOpen: true,
      isEditingTitle: false,
    });
  },

  reset: () =>
    set({
      boards: [],
      selectedBoard: null,
      isLoaded: false,
      isOpen: false,
      isCreateBoardModalOpen: false,
      isEditingTitle: false,
      title: '',
      color: '#808080',
      newTitle: '',
      newColor: '',
    }),
}));

export default useBoardStore;
