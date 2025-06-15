import api from '@api/http/http';
import { showToast } from '@utils/toast/toast';

export async function updateBoard(uuid, updatedFields) {
  if (!updatedFields) updatedFields = {};
  // console.log(uuid);
  if (!uuid) {
    showToast('Ошибка: доска не выбрана', 'error');
    return null;
  }

  // console.log('updateFields:', updatedFields);

  if (
    'title' in updatedFields &&
    (!updatedFields.title || !updatedFields.title.trim())
  ) {
    showToast('Название доски не может быть пустым!', 'error');
    return null;
  }

  try {
    const response = await api.patch(
      `/todo/updateBoard/${uuid}`,
      updatedFields,
    );
    // console.log(response);
    if (response.status === 200 && response.data?.data) {
      const board = response.data.data;

      // if ('title' in board) {
      //   showToast('Название доски изменено', 'success');
      // }

      // if ('color' in board) {
      //   showToast('Цвет доски обновлен', 'success');
      // }

      // if ('isPinned' in board) {
      //   showToast(
      //     board.isPinned ? 'Доска закреплена' : 'Доска откреплена',
      //     'success',
      //   );
      // }

      // if ('isFavorite' in board) {
      //   showToast(
      //     board.isFavorite
      //       ? 'Доска добавлена в избранное'
      //       : 'Доска убрана из избранного',
      //     'success',
      //   );
      // }
      return board;
    } else {
      showToast('Ошибка при обновлении доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при обновлении доски:', error);
    if (error.response && error.response.status === 429) {
      showToast(
        error.response.data.error || 'Слишком много запросов, попробуйте позже',
        'error',
      );
      return false;
    }
    showToast('Ошибка при обновлении доски', 'error');
    return null;
  }
}
