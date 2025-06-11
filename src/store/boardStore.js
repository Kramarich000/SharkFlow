import { create } from 'zustand';
import { loadBoards as fetchBoards } from '@api/http/loadBoards';

const useBoardStore = create((set, get) => ({
  boards: [],
  isLoaded: false,

  setBoards: (boards) => set({ boards }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  loadBoards: async (token) => {
    if (get().isLoaded) return;

    const boards = await fetchBoards(token);
    set({ boards, isLoaded: true });
  },

  resetBoards: () => set({ boards: [], isLoaded: false }),
}));

export default useBoardStore;
