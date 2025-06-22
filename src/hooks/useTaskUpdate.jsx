import { useState, useEffect } from 'react';
import useTaskStore from '@store/taskStore';
import DOMPurify from 'dompurify';

export const useTaskUpdate = (selectedTask) => {
  const { updateTask } = useTaskStore();
  
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // Синхронизируем состояние с выбранной задачей
  useEffect(() => {
    if (selectedTask) {
      setNewTitle(selectedTask.title);
      setNewDueDate(selectedTask.dueDate);
      setNewDescription(selectedTask.description);
      setNewPriority(selectedTask.priority);
      setNewStatus(selectedTask.status);
    }
  }, [selectedTask]);

  const handleUpdateTask = async () => {
    const updatedFields = {};

    const newDueDateISO =
      newDueDate instanceof Date ? newDueDate.toISOString() : newDueDate;

    const sanitizedDescription = DOMPurify.sanitize(newDescription);

    if (newTitle !== selectedTask.title) updatedFields.title = newTitle;
    if (newDueDateISO !== selectedTask.dueDate)
      updatedFields.dueDate = newDueDateISO;
    if (sanitizedDescription !== selectedTask.description)
      updatedFields.description = sanitizedDescription;
    if (newPriority !== selectedTask.priority)
      updatedFields.priority = newPriority;
    if (newStatus !== selectedTask.status) updatedFields.status = newStatus;

    if (Object.keys(updatedFields).length > 0) {
      await updateTask({
        uuid: selectedTask.uuid,
        ...updatedFields,
      });
    }
  };

  return {
    // Состояние
    newTitle,
    newDueDate,
    newDescription,
    newPriority,
    newStatus,
    
    // Сеттеры
    setNewTitle,
    setNewDueDate,
    setNewDescription,
    setNewPriority,
    setNewStatus,
    
    // Действия
    handleUpdateTask,
  };
}; 