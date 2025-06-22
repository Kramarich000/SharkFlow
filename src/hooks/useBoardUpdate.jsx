import { useState, useEffect } from 'react';
import useBoardStore from '@store/boardStore';

export const useBoardUpdate = (selectedBoard) => {
  const { updateBoard } = useBoardStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [newIsFavorite, setNewIsFavorite] = useState(false);
  const [load, setLoad] = useState(false);

  // Синхронизируем состояние с выбранной доской
  useEffect(() => {
    if (selectedBoard) {
      setNewTitle(selectedBoard.title);
      setNewColor(selectedBoard.color);
      setNewIsPinned(selectedBoard.isPinned ?? false);
      setNewIsFavorite(selectedBoard.isFavorite ?? false);
      setIsEditing(false);
    }
  }, [selectedBoard]);

  const saveUpdateBoard = async () => {
    if (!selectedBoard || load) return;
    setLoad(true);

    const updatedFields = {};
    if (newTitle !== selectedBoard.title) {
      updatedFields.title = newTitle;
    }
    const cleanNewColor = newColor.startsWith('#')
      ? newColor.slice(1)
      : newColor;
    if (cleanNewColor !== selectedBoard.color) {
      updatedFields.color = cleanNewColor;
    }
    if (newIsPinned !== selectedBoard.isPinned) {
      updatedFields.isPinned = newIsPinned;
    }
    if (newIsFavorite !== selectedBoard.isFavorite) {
      updatedFields.isFavorite = newIsFavorite;
    }

    try {
      await updateBoard({ uuid: selectedBoard.uuid, ...updatedFields });
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка при обновлении доски:', err);
    } finally {
      setLoad(false);
    }
  };

  return {
    // Состояние
    isEditing,
    newTitle,
    newColor,
    newIsPinned,
    newIsFavorite,
    load,
    
    // Сеттеры
    setIsEditing,
    setNewTitle,
    setNewColor,
    setNewIsPinned,
    setNewIsFavorite,
    
    // Действия
    saveUpdateBoard,
  };
}; 