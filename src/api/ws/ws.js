import { io } from 'socket.io-client';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-api-gavu.onrender.com'
    : 'http://localhost:8080';

let socket = null;

export const connectSocket = (token) => {
  if (socket) return socket;

  socket = io(baseURL, {
    auth: { token },
    autoConnect: true,
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const setupSocketListeners = (
  socket,
  { onNotify, onError, onConnect, onDisconnect },
) => {
  socket.on('connect', () => {
    console.log('[SOCKET] Connected with id:', socket.id);
    onConnect?.();
  });

  socket.on('connect_error', (err) => {
    console.error('[SOCKET] Connection error:', err.message);
    onError?.(err);
  });

  socket.on('notification', (data) => {
    console.log('[SOCKET] Notification:', data);
    onNotify?.(data);
  });

  socket.on('disconnect', (reason) => {
    console.log('[SOCKET] Disconnected:', reason);
    onDisconnect?.(reason);
  });
};

export const getSocket = () => socket;
