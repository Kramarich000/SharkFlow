import { useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { logoutUser } from '@features/auth';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { getUserDevices } from '@features/user/api/get/getUserDevices';
import { FaComputer } from 'react-icons/fa6';
import { FaMobileAlt } from 'react-icons/fa';
import { logoutUserDevice } from '@features/auth/api/logout/logoutUserDevice';
import { logoutAllUserDevices } from '@features/auth/api/logout/logoutAllUserDevices';

export function UserSessionsModal() {
  const [load, setLoad] = useState(false);
  const [devices, setDevices] = useState([]);

  const isUserSessionsModalOpen = useModalsStore(
    (state) => state.isUserSessionsModalOpen,
  );
  const setIsUserSessionsModalOpen = useModalsStore(
    (state) => state.setIsUserSessionsModalOpen,
  );

  const myDeviceId =
    typeof window !== 'undefined' ? localStorage.getItem('device_id') : null;

  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const response = await getUserDevices();
        setDevices(response?.devices || []);
      } catch (error) {
        setDevices([]);
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      }
    };

    if (isUserSessionsModalOpen) {
      fetchData();
    }
  }, [isUserSessionsModalOpen]);

  const handleClose = () => {
    setIsUserSessionsModalOpen(false);
    setLoad(false);
  };

  useEffect(() => {
    if (!isUserSessionsModalOpen) {
      setLoad(false);
    }
  }, [isUserSessionsModalOpen]);

  const handleLogoutDevice = async (deviceId) => {
    try {
      await logoutUserDevice(deviceId);
      setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
    } catch (e) {}
  };

  const handleLogoutAllDevices = async () => {
    try {
      const success = await logoutAllUserDevices();
      if (success) {
        setIsUserSessionsModalOpen(false);
      }
    } catch (e) {}
  };

  return (
    <ModalBase open={isUserSessionsModalOpen} onClose={handleClose}>
      <h2 className="text-center text-3xl mb-4">Ваши устройства</h2>
      {load ? (
        <div className="h-full mt-4 mb-4 flex-col flex items-center justify-center">
          <div
            key="loader"
            className="text-7xl flex gap-8 text-center animate-spin"
          >
            <AiOutlineSync />
          </div>
          <p className="text-4xl mt-4 animate-pulse text-center">
            Обработка запроса
          </p>
        </div>
      ) : (
        <div className="flex !flex-col sm:flex-row gap-3 border-b-1 pb-2">
          <div className="w-full">
            {devices.length === 0 && (
              <p className="text-center">Нет активных устройств</p>
            )}
            {devices.map((device) => (
              <div key={device.deviceId}>
                <p className="flex items-center gap-3 mb-4">
                  <b>
                    {device.deviceType === 'desktop' ? (
                      <FaComputer size={38} />
                    ) : (
                      <FaMobileAlt size={38} />
                    )}
                  </b>{' '}
                  {device.osName} {device.osVersion} {device.clientName}{' '}
                  {device.clientVersion}
                  {myDeviceId && (
                    <p className="bg-[var(--main-button-bg)] p-1 px-2 text-white rounded-4xl">
                      Текущее устройство
                    </p>
                  )}
                </p>
                <p>
                  IP: {device.ipAddress} {device.geoLocation?.city}{' '}
                  {device.geoLocation?.country}
                  Локация |{device.geoLocation}| Бренд |{device.deviceBrand}|
                  Тип |{device.deviceModel}|
                </p>
                <p>
                  Последняя активность:{' '}
                  {device.lastUsedAt
                    ? new Date(device.lastUsedAt).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </p>
                <p>
                  Вход:{' '}
                  {device.lastLoginAt
                    ? new Date(device.lastLoginAt).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </p>
                <p>
                  {device.isActive ? (
                    <span className="text-green-500">Активно</span>
                  ) : (
                    <span className="text-red-500">Неактивно</span>
                  )}
                </p>
                {!myDeviceId && (
                  <Button
                    variant="primary"
                    className="!w-fit !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                    onClick={() => handleLogoutDevice(device.deviceId)}
                  >
                    Выйти
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {devices.length > 1 && !load && (
        <Button
          variant="primary"
          className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
          onClick={() => handleLogoutAllDevices()}
        >
          Выйти со всех устройств
        </Button>
      )}
    </ModalBase>
  );
}
