import { useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { logoutUser } from '@features/auth';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { getUserDevices } from '@features/user/api/get/getUserDevices';
import { FaComputer } from 'react-icons/fa6';

import {
  FaMobileAlt,
  FaTabletAlt,
  FaGamepad,
  FaTv,
  FaCar,
} from 'react-icons/fa';
import { IoWatch } from 'react-icons/io5';

import { logoutUserDevice } from '@features/auth/api/logout/logoutUserDevice';
import { logoutAllUserDevices } from '@features/auth/api/logout/logoutAllUserDevices';
import { TbWorld } from 'react-icons/tb';
import { BsGeoAltFill } from 'react-icons/bs';
import { LuClock } from 'react-icons/lu';
import { GrSatellite } from 'react-icons/gr';
import { FaCompass } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

export function UserSessionsModal() {
  const [load, setLoad] = useState(false);
  const [devices, setDevices] = useState([]);

  const isUserSessionsModalOpen = useModalsStore(
    (state) => state.isUserSessionsModalOpen,
  );
  const setIsUserSessionsModalOpen = useModalsStore(
    (state) => state.setIsUserSessionsModalOpen,
  );

  const isConfirmLogoutDevicesModalOpen = useModalsStore(
    (state) => state.isConfirmLogoutDevicesModalOpen,
  );
  const setIsConfirmLogoutDevicesModalOpen = useModalsStore(
    (state) => state.setIsConfirmLogoutDevicesModalOpen,
  );

  const myDeviceId =
    typeof window !== 'undefined' ? localStorage.getItem('device_id') : null;

  const deviceIcons = {
    desktop: <FaComputer size={68} />,
    smartphone: <FaMobileAlt size={68} />,
    tablet: <FaTabletAlt size={68} />,
    console: <FaGamepad size={68} />,
    tv: <FaTv size={68} />,
    car: <FaCar size={68} />,
    watch: <IoWatch size={68} />,
  };

  const [step, setStep] = useState(0);

  const sources = [
    `https://besticon.net/icon?url=${domain}&size=${size}..${size * 2}..${size * 4}`,
    `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`,
    `https://api.faviconkit.com/${domain}/${size}`,
  ];

  const handleError = () => {
    if (step < sources.length - 1) {
      setStep(step + 1);
    }
  };

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
      setDevices((prev) =>
        prev.map((d) =>
          d.deviceId === deviceId ? { ...d, isActive: false } : d,
        ),
      );
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
    <ModalBase
      maxWidth="max-w-full"
      className="max-h-full"
      open={isUserSessionsModalOpen}
      onClose={handleClose}
    >
      <div className="flex flex-col max-h-[70vh] sm:max-h-[85vh] relative">
        <h2 className="text-center text-3xl mb-4">Ваши устройства</h2>
        <Button
          variant="tertiary"
          className="!transition !hidden sm:!inline !text-[var(--main-text)] !bg-transparent hover:!bg-transparent absolute top-[-15px] right-0 justify-center px-4 py-2 hover:!text-[var(--main-primary-hover)]"
          onClick={handleClose}
        >
          <IoClose size={40} />
        </Button>
        {load ? (
          <div className="mt-4 mb-4 flex-col flex items-center h-full justify-center">
            <div className="text-7xl flex gap-8 text-center animate-spin">
              <AiOutlineSync />
            </div>
            <p className="text-4xl mt-4 animate-pulse text-center">
              Обработка запроса
            </p>
          </div>
        ) : (
          <div className="overflow-auto grow pr-2">
            <div className="flex flex-col justify-center lg:grid grid-cols-2 w-full gap-3 pb-2">
              {devices.length === 0 && (
                <p className="text-center mx-auto col-span-2">
                  Нет активных устройств
                </p>
              )}
              {[...devices]
                .sort((a, b) =>
                  a.deviceId === myDeviceId
                    ? -1
                    : b.deviceId === myDeviceId
                      ? 1
                      : 0,
                )
                .map((device) => {
                  const geo = device.geoLocation || {};
                  const flagImg = geo.flag?.img || null;
                  const flagEmoji = geo.flag?.emoji || '';
                  const timezoneAbbr = geo.timezone?.abbr || null;
                  const timezoneUTC = geo.timezone?.utc || null;
                  const ispDomain = geo.connection?.domain || null;
                  const ispName = geo.connection?.isp || '—';
                  const latitude = geo.latitude || null;
                  const longitude = geo.longitude || null;

                  const ip = geo.ip || '—';
                  const city = geo.city || '—';
                  const region = geo.region || '—';
                  const country = geo.country || '—';
                  const postal = geo.postal || '—';

                  const locationParts = [city, region, country].filter(
                    (part) => part !== '—',
                  );
                  const locationDisplay =
                    locationParts.length > 0 ? locationParts.join(', ') : '—';

                  const timezoneDisplay =
                    timezoneAbbr && timezoneUTC
                      ? `${timezoneAbbr} (${timezoneUTC})`
                      : '—';

                  return (
                    <div
                      key={device.deviceId}
                      className="text-center items-center lg:items-start border flex flex-col h-full justify-between rounded-xl p-4 mb-6"
                    >
                      <div className="flex flex-col sm:flex-row mx-auto gap-3 items-center justify-center">
                        <b>
                          {deviceIcons[device.deviceType] || (
                            <FaMobileAlt size={68} />
                          )}
                        </b>{' '}
                        <p>
                          {device.osName || 'Неизвестная ОС'}{' '}
                          {device.osVersion || ''} {device.deviceBrand || ''}{' '}
                          {device.deviceModel || ''}{' '}
                          {device.clientName || 'Неизвестный клиент'}{' '}
                          {device.clientVersion || ''}
                        </p>
                        {device.deviceId === myDeviceId && (
                          <p className="bg-[var(--main-button-bg)] p-1 px-2 text-white rounded-4xl">
                            Вы
                          </p>
                        )}
                      </div>

                      <div className="rounded p-4 mt-1 flex flex-col gap-3 w-full">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <TbWorld className="hidden sm:block" size={23} />{' '}
                          <b>IP:</b> {ip}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <BsGeoAltFill className="hidden sm:block" size={23} />{' '}
                          <b>Местоположение:</b> {locationDisplay}{' '}
                          {flagImg && (
                            <img
                              src={flagImg}
                              alt="flag"
                              className="inline w-5 h-4 mr-1 rounded-sm border"
                              onError={(e) =>
                                (e.currentTarget.style.display = 'none')
                              }
                            />
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <LuClock className="hidden sm:block" size={23} />{' '}
                          <b>Часовой пояс:</b> {timezoneDisplay}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <GrSatellite className="hidden sm:block" size={23} />{' '}
                          <b>Провайдер:</b>{' '}
                          {ispDomain ? (
                            <>
                              <a
                                href={`https://${ispDomain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {ispName}
                              </a>
                              {step < sources.length ? (
                                <img
                                  src={sources[step]}
                                  alt="favicon"
                                  width={size}
                                  height={size}
                                  className="inline mr-1 align-text-bottom"
                                  onError={handleError}
                                />
                              ) : (
                                <FaGlobe
                                  size={size}
                                  className="inline mr-1 align-text-bottom text-gray-400"
                                />
                              )}
                            </>
                          ) : (
                            ispName
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <FaCompass className="hidden sm:block" size={23} />{' '}
                          <b>Координаты:</b>{' '}
                          {latitude && longitude ? (
                            <a
                              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="!text-blue-600 underline"
                            >
                              Смотреть на карте
                            </a>
                          ) : (
                            '—'
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <MdEmail className="hidden sm:block" size={23} />{' '}
                          <b>Почтовый индекс:</b> {postal}
                        </div>
                      </div>
                      <p>
                        Последняя активность:{' '}
                        {device.lastUsedAt
                          ? new Date(device.lastUsedAt).toLocaleDateString(
                              'ru-RU',
                              {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : 'Не обнаружена'}
                      </p>
                      <p>
                        Вход:{' '}
                        {device.lastLoginAt
                          ? new Date(device.lastLoginAt).toLocaleDateString(
                              'ru-RU',
                              {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : '—'}
                      </p>
                      <div className="flex mt-2 w-full gap-3 flex-col lg:flex-row items-center justify-between gap-y-3">
                        {device.isActive ? (
                          <span className="!text-white inline-block !bg-green-800 p-1 px-2 rounded-4xl mt-2">
                            Активно
                          </span>
                        ) : (
                          <span className="!text-white mt-auto inline-block !bg-red-800 p-1 px-2 rounded-4xl ">
                            Неактивно
                          </span>
                        )}

                        {device.deviceId !== myDeviceId && (
                          <>
                            <Button
                              variant="delete"
                              className={`!w-full sm:!w-fit !m-0 !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)] ${device.isActive ? '' : 'pointer-events-none !bg-[#ffbbbb]'}`}
                              onClick={() =>
                                handleLogoutDevice(device.deviceId)
                              }
                            >
                              Выйти
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {devices.length > 1 && !load && (
        <>
          <Button
            variant="primary"
            className="!bg-[var(--main-btn-delete-bg)] !m-0 !mx-auto !w-fit hover:!bg-[var(--main-btn-delete-hover-bg)]"
            onClick={() => setIsConfirmLogoutDevicesModalOpen(true)}
          >
            Выйти со всех устройств
          </Button>
          <Button className="sm:hidden" variant="primary" onClick={handleClose}>
            Закрыть
          </Button>
        </>
      )}
    </ModalBase>
  );
}
