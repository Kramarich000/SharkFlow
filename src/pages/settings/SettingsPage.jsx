import { useState, useEffect, useRef } from 'react';
import { useModalsStore } from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import { TbAuth2Fa } from 'react-icons/tb';
import { FaCamera } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import Cropper from 'react-easy-crop';

import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth';
import { ToggleTheme } from '@features/user/components/ToggleTheme';
import { Button } from '@common/ui/utilities/Button';
import { getCloudinarySignature } from '@features/user/api/cloudinary/getCloudinarySignature';
import { uploadUrl } from '@features/user/api/cloudinary/uploadUrl';
import { uploadImgToCloudinary } from '@features/user/api/cloudinary/uploadImgToCloudinary';
import { showToast } from '@utils/toast';
import getCroppedImg from '@utils/img/getCroppedImg';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const fileInputRef = useRef(null);

  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );

  const setIsUpdateUserModalOpen = useModalsStore(
    (state) => state.setIsUpdateUserModalOpen,
  );

  const {
    isSetupTotpModalOpen,
    setIsSetupTotpModalOpen,
    isDisableTotpModalOpen,
    setIsDisableTotpModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      isSetupTotpModalOpen: state.isSetupTotpModalOpen,
      setIsSetupTotpModalOpen: state.setIsSetupTotpModalOpen,
      isDisableTotpModalOpen: state.isDisableTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
    })),
  );

  const user = useUserStore((state) => state.user);

  const updateUser = useUserStore((state) => state.updateUser);

  const token = useAuthStore((state) => state.accessToken);

  const role = useAuthStore((state) => state.userRole);

  const twoFactorEnabled = useAuthStore((state) => state.twoFactorEnabled);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  function onSelectFile(event) {
    const file = event.target.files?.[0];
    if (!file) {
      showToast('Файл не выбран.', 'error');
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!allowedTypes.includes(file.type)) {
      showToast(
        'Недопустимый формат файла. Разрешены: JPG, PNG, WEBP, GIF.',
        'error',
      );
      event.target.value = '';
      return;
    }

    setPreviewUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);

    setSelectedImage(URL.createObjectURL(file));
    setCropModalOpen(true);
  }

  async function handleCropComplete() {
    setImgLoading(true);
    try {
      const blob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        'image/webp',
        0.8,
      );

      const file = new File([blob], 'avatar.jpg', { type: blob.type });
      const { api_key, timestamp, signature } = await getCloudinarySignature();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('upload_preset', 'Precet-SharkFlow');
      const data = await uploadImgToCloudinary(formData);
      const upload = await uploadUrl(data.secure_url);
      if (!upload.avatarUrl) throw new Error('Сервер не вернул ссылку');
      updateUser({ avatarUrl: upload.avatarUrl });
      setAvatarLoading(true);
      setCropModalOpen(false);
    } catch (e) {
      console.error(e);
      showToast('Не удалось загрузить обрезанное фото', 'error');
    } finally {
      setImgLoading(false);
    }
  }

  return (
    <div className="p-0 sm:p-10 lg:p-30 lg:px-50 h-full">
      {/* <p>роль: {role}</p> */}
      {loading ? (
        <div className="h-full flex-col flex items-center justify-center">
          <motion.div
            key="loader"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'linear',
            }}
            className="text-7xl flex gap-8 text-center"
          >
            <AiOutlineSync />
          </motion.div>
          <p className="text-4xl mt-4 animate-pulse">Загрузка ваших данных</p>
        </div>
      ) : role === 'guest' ? (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <div>
            <p className="text-4xl mb-4">Гостевой аккаунт</p>
            <p className="text-xl">
              Это гостевой аккаунт, войдите или зарегистрируйтесь в течении 24
              часов чтобы сохранить данные
            </p>
          </div>
          <ToggleTheme />
        </div>
      ) : (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <div className="flex flex-col items-center gap-4 p-6 rounded-full bg-surface shadow-lg">
            <div className="flex items-center justify-center gap-6">
              <>
                <div className="relative">
                  <div className="relative">
                    {user.avatarUrl ? (
                      <img
                        src={user?.avatarUrl}
                        alt=""
                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover border-2 !border-[var(--main-primary)] rounded-full"
                        onLoad={() => setAvatarLoading(false)}
                        onError={() => setAvatarLoading(false)}
                      />
                    ) : (
                      <p className="w-32 h-32 sm:w-40 sm:h-40 text-center select-none flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full">
                        Фото профиля
                      </p>
                    )}
                    {imgLoading ||
                      (avatarLoading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                          <AiOutlineSync className="animate-spin" size={40} />
                        </div>
                      ))}
                  </div>

                  <Button
                    onClick={handleButtonClick}
                    variant="tertiary"
                    className="absolute bottom-0 right-0 bg-[var(--main-primary)] text-white rounded-full p-2 shadow-md hover:bg-[var(--main-hover)] transition"
                    title="Загрузить фото"
                  >
                    <FaCamera />
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{user?.login}</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
              </>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onSelectFile}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              onClick={() => setIsUpdateUserModalOpen(true)}
            >
              Изменить данные
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsDeleteUserModalOpen(true)}
            >
              Удалить аккаунт
            </Button>
            {!twoFactorEnabled ? (
              <Button
                variant="primary"
                onClick={() => setIsSetupTotpModalOpen(true)}
              >
                <TbAuth2Fa size={24} /> Подключить двуфакторную аутентификацию
                (приложение TOTP)
              </Button>
            ) : (
              <Button
                variant="primary"
                className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                onClick={() => setIsDisableTotpModalOpen(true)}
              >
                <TbAuth2Fa size={24} /> Отключить двуфакторную аутентификацию
              </Button>
            )}
          </div>
          <ToggleTheme />
        </div>
      )}
      {cropModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[var(--main-primary)] p-6 rounded-xl w-[90vw] max-w-md">
            {previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewUrl}
                  alt="Превью обрезки"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
                <div className="flex gap-2 w-full">
                  <Button
                    disabled={imgLoading}
                    variant="primary"
                    onClick={() => setPreviewUrl(null)}
                  >
                    Перезагрузить
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleCropComplete}
                    disabled={imgLoading}
                  >
                    {imgLoading ? (
                      <AiOutlineSync className="animate-spin" size={23} />
                    ) : (
                      'Загрузить'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative w-full h-80 bg-gray-200">
                  <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, area) => setCroppedAreaPixels(area)}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="primary"
                    onClick={() => setCropModalOpen(false)}
                    disabled={!croppedAreaPixels}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      try {
                        const preview = await getCroppedImg(
                          selectedImage,
                          croppedAreaPixels,
                          'image/jpeg',
                          0.9,
                          true,
                        );
                        setPreviewUrl(preview);
                      } catch (e) {
                        showToast('Не удалось подготовить превью', 'error');
                      }
                    }}
                    disabled={!croppedAreaPixels}
                  >
                    Предпросмотр
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
