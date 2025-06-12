import { useState, useEffect } from 'react';
import { useAuthStore } from '/src/store/authStore.js';
import api from '@api/http/http';
import { showToast } from '@utils/toast';

export const useBoards = () => {
  const token = useAuthStore((state) => state.accessToken);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#808080');
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    if (!token) return;
    fetchBoards();
  }, [token]);

  useEffect(() => {
    if (selectedBoard) {
      setNewTitle(selectedBoard.title);
      setNewColor(selectedBoard.color);
    }
  }, [selectedBoard]);

  const fetchBoards = async () => {
    try {
      const response = await api.get('/todo/boards', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setBoards(response.data.boards);
      }
    } catch (error) {
      console.error('Ошибка при загрузке досок', error);
    }
  };

  const createBoard = async (title, color) => {
    if (!title.trim()) {
      showToast('Название не может быть пустым', 'error');
      return false;
    }
    if (!color.trim()) {
      showToast('Выберите цвет!', 'error');
      return false;
    }
    if (!token) {
      showToast('Ошибка: отсутствует токен', 'error');
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
      console.log('Ответ от сервера:', response.data);

      if (response.data && response.data.title && response.data.color) {
        setBoards((prev) => [...prev, response.data]);
        setTitle('');
        setColor('#000000');
        showToast('Доска успешно создана', 'success');
        handleBoardSelect(response.data);
        return true;
      }
    } catch (error) {
      console.error('Ошибка при создании доски:', error);
      showToast('Серверная ошибка', 'error');
    }
    return false;
  };

  const updateBoard = async (boardId, newTitle, newColor) => {
    console.log('Обновление доски:', { boardId, newTitle, newColor });

    if (!boardId) {
      showToast('Ошибка: доска не выбрана', 'error');
      return false;
    }

    if (!newTitle || !newTitle.trim()) {
      showToast('Название доски не может быть пустым!', 'error');
      return false;
    }

    try {
      const response = await api.put(
        `/todo/editBoard/${boardId}`,
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

        setBoards((prev) =>
          prev.map((board) =>
            board.uuid === boardId
              ? { ...board, title: newTitle.trim(), color: newColor.trim() }
              : board,
          ),
        );
        setSelectedBoard((prev) =>
          prev
            ? { ...prev, title: newTitle.trim(), color: newColor.trim() }
            : prev,
        );

        setIsEditingTitle(false);
        return true;
      }
    } catch (error) {
      console.error('Ошибка при обновлении названия доски:', error);
      showToast('Ошибка при обновлении названия доски', 'error');
      setIsEditingTitle(false);
    }
    return false;
  };

  const handleBoardSelect = (board) => {
    console.log('handleBoardSelect получил:', board);
    setSelectedBoard(board);
    setNewTitle(board.title);
    setNewColor(board.color);
    setIsOpen(true);
    setIsEditingTitle(false);
  };

  return {
    boards,
    selectedBoard,
    isOpen,
    isEditingTitle,
    title,
    newTitle,
    color,
    newColor,
    setBoards,
    setSelectedBoard,
    setIsOpen,
    setIsEditingTitle,
    setTitle,
    setColor,
    setNewTitle,
    setNewColor,
    createBoard,
    updateBoard,
    fetchBoards,
    handleBoardSelect,
  };
};
