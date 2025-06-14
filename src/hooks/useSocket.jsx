import { showToast } from '@utils/toast/toast';
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
      onConnect: () =>
        // showToast('Соединение установлено!', 'info')
        console.log('Соединение установлено!'),
      onError: () => console.log('Ошибка при попытке установить соединение!'),
      // showToast('Ошибка при попытке установить соединение!', 'error'),
      onNotify: (data) => setNotify(data.message),
      onDisconnect: () =>
        // showToast('Соединение разорвано', 'warning'),
        console.log('Соединение разорвано'),
    });

    return () => disconnectSocket();
  }, [accessToken]);
}
