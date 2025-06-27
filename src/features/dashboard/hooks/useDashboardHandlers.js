import { useShallow } from 'zustand/react/shallow';
import {
  useBoardStore,
  useBoardUpdate,
  useCreateBoard,
} from '@features/boards';
import { useModalsStore } from '@store/modalsStore';

export function useDashboardHandlers() {
  const { handleBoardSelect } = useBoardStore(
    useShallow((s) => ({
      handleBoardSelect: s.handleBoardSelect,
    })),
  );
  const { mutate: updateBoard } = useBoardUpdate();
  const { mutate: createBoard } = useCreateBoard();

  const { setIsDetailsBoardModalOpen, setIsDeleteBoardModalOpen, contextMenu } =
    useModalsStore(
      useShallow((s) => ({
        setIsDetailsBoardModalOpen: s.setIsDetailsBoardModalOpen,
        setIsDeleteBoardModalOpen: s.setIsDeleteBoardModalOpen,
        contextMenu: s.contextMenu,
      })),
    );

  const handleTogglePin = async (board) => {
    updateBoard({ uuid: board.uuid, data: { isPinned: !board.isPinned } });
  };

  const handleToggleFav = async (board) => {
    updateBoard({ uuid: board.uuid, data: { isFavorite: !board.isFavorite } });
  };

  const handleEditBoard = () => {
    if (!contextMenu.board) return;
    handleBoardSelect(contextMenu.board);
    setIsDetailsBoardModalOpen(true);
  };

  const handleDuplicateBoard = async () => {
    if (!contextMenu.board) return;
    const { title, color } = contextMenu.board;
    let newTitle = `${title} (копия)`;
    createBoard({ title: newTitle, color });
  };

  const handleDeleteBoard = () => {
    if (!contextMenu.board) return;
    handleBoardSelect(contextMenu.board);
    setIsDeleteBoardModalOpen(true);
  };

  return {
    handleTogglePin,
    handleToggleFav,
    handleEditBoard,
    handleDuplicateBoard,
    handleDeleteBoard,
  };
}
