import { Fragment, useState, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Button } from '@common/ui/utilities/Button';
import Cropper from 'react-easy-crop';
import { AiOutlineSync } from 'react-icons/ai';
import { showToast } from '@utils/toast';
import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import getCroppedImg from '@utils/img/getCroppedImg';
import { getCloudinarySignature } from '@features/user/api/cloudinary/getCloudinarySignature';
import { uploadUrl } from '@features/user/api/cloudinary/uploadUrl';
import { uploadImgToCloudinary } from '@features/user/api/cloudinary/uploadImgToCloudinary';
import { AnimatePresence, motion } from 'framer-motion';

export function AvatarCropModal() {
  const isAvatarCropModalOpen = useModalsStore(
    (state) => state.isAvatarCropModalOpen,
  );
  const setIsAvatarCropModalOpen = useModalsStore(
    (state) => state.setIsAvatarCropModalOpen,
  );
  const updateUser = useUserStore((state) => state.updateUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const isProcessing = useRef(false);
  const fileInputRef = useRef(null);

  const step = !selectedImage ? 'empty' : previewUrl ? 'preview' : 'cropper';

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSelectFile = (event) => {
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
  };

  const handleCropComplete = useCallback(async () => {
    if (imgLoading || isProcessing.current) return;
    isProcessing.current = true;
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
      const upload = await uploadUrl(data.secure_url, data.public_id);
      if (!upload.avatarUrl) throw new Error('Сервер не вернул ссылку');
      updateUser({ avatarUrl: upload.avatarUrl });
      handleClose();
    } catch (e) {
      console.error(e);
      showToast('Не удалось загрузить обрезанное фото', 'error');
    } finally {
      setImgLoading(false);
      isProcessing.current = false;
    }
  }, [selectedImage, croppedAreaPixels, updateUser, imgLoading]);

  const handleClose = useCallback(() => {
    setIsAvatarCropModalOpen(false);
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPreviewUrl(null);
    setImgLoading(false);
  }, [setIsAvatarCropModalOpen]);

  return (
    <Transition appear show={isAvatarCropModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        static={true}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <DialogPanel className="bg-[var(--main-modal-bg)] border-2 border-[var(--main-modal-border)] p-6 rounded-xl w-[90vw] max-w-md">
              <AnimatePresence mode="wait">
                {step === 'cropper' && (
                  <motion.div
                    key="cropper"
                    initial={{ opacity: 0, transform: 'translateX(50px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    className="flex flex-col gap-4"
                  >
                    <div className="relative w-full h-80 bg-gray-200 border-2 border-[var(--main-modal-border)] rounded-lg">
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
                    <div className="flex justify-center flex-wrap gap-2">
                      <Button
                        className="rounded-full"
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
                          } catch {
                            showToast('Не удалось подготовить превью', 'error');
                          }
                        }}
                        disabled={!croppedAreaPixels}
                      >
                        Предпросмотр
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setSelectedImage(null)}
                        disabled={imgLoading}
                      >
                        Выбрать другое фото
                      </Button>

                      <Button
                        variant="primary"
                        onClick={handleClose}
                        disabled={!croppedAreaPixels}
                      >
                        Отмена
                      </Button>
                    </div>
                  </motion.div>
                )}
                {step === 'preview' && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, transform: 'translateX(50px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    className="flex flex-col items-center gap-4"
                  >
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
                  </motion.div>
                )}
                {step === 'empty' && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, transform: 'translateX(0px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    className="flex flex-col items-center gap-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={onSelectFile}
                      className="hidden"
                    />
                    <Button variant="primary" onClick={handleButtonClick}>
                      Выбрать фото
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
