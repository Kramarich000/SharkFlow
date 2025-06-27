import { useEffect, useState } from 'react';

import { connectSocket, disconnectSocket, setupSocketListeners } from '@lib/ws';

export function useSocket(accessToken) {
  const [notify, setNotify] = useState('');

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket(accessToken);

    setupSocketListeners(socket, {
      onConnect: () => console.log('Соединение установлено'),
      onError: () => console.log('Ошибка при попытке установить соединение'),
      onNotify: (data) => setNotify(data.message),
      onDisconnect: () => console.log('Соединение разорвано'),
    });

    return () => disconnectSocket();
  }, [accessToken]);
}
