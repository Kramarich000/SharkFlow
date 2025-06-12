import { showToast } from '@utils/toast';
import { useEffect, useState } from 'react';
import {
  connectSocket,
  disconnectSocket,
  setupSocketListeners,
} from '@api/ws/ws';

export function useSocket(accessToken) {
  const [notify, setNotify] = useState('');

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket(accessToken);

    setupSocketListeners(socket, {
      onConnect: () => showToast('Соединение установлено!', 'info'),
      // onError: () =>
      //   showToast('Ошибка при попытке установить соединение!', 'error'),
      onNotify: (data) => setNotify(data.message),
      onDisconnect: () => showToast('Соединение разорвано', 'warning'),
    });

    return () => disconnectSocket();
  }, [accessToken]);
}
