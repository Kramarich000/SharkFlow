import { Fragment, useState, useRef, useCallback } from 'react';
import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { showToast } from '@utils/toast';
import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import getCroppedImg from '@utils/img/getCroppedImg';
import { getCloudinarySignature } from '@features/user/api/cloudinary/getCloudinarySignature';
import { uploadUrl } from '@features/user/api/cloudinary/uploadUrl';
import { uploadImgToCloudinary } from '@features/user/api/cloudinary/uploadImgToCloudinary';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { StepEmpty, StepCropper, StepPreview } from '@features/user';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { IoClose } from 'react-icons/io5';
import { useResponsive } from '@common/hooks';

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
  const [error, setError] = useState(null);
  const isProcessing = useRef(false);

  const { isMobile } = useResponsive();

  const step = !selectedImage ? 'empty' : previewUrl ? 'preview' : 'cropper';

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

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      const fakeEvent = {
        target: {
          files: [file],
          value: file.name,
        },
      };
      onSelectFile(fakeEvent);
    },
    [onSelectFile],
  );

  const onDropRejected = useCallback((rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const file = rejectedFiles[0];
      if (file.errors && file.errors[0].code === 'file-invalid-type') {
        showToast(
          'Недопустимый формат файла. Разрешены: JPG, PNG, WEBP, GIF.',
          'error',
        );
      } else {
        showToast('Произошла ошибка при загрузке файла.', 'error');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': [],
    },
    multiple: false,
  });

  return (
    <ModalBase
      open={isAvatarCropModalOpen}
      onClose={handleClose}
      // maxWidth="max-w-md"
      disableOverlayClose={true}
      className="!pt-12"
    >
      {isMobile && (
        <Button
          variant="tertiary"
          className="absolute !bg-transparent hover:!text-[var(--main-primary-hover)] hover:!bg-transparent top-0 right-0"
          onClick={() => setIsAvatarCropModalOpen(false)}
        >
          <IoClose size={30} />
        </Button>
      )}
      <AnimatePresence mode="wait">
        {step === 'cropper' && (
          <motion.div
            key="cropper"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <StepCropper
              selectedImage={selectedImage}
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              setCroppedAreaPixels={setCroppedAreaPixels}
              getCroppedImg={getCroppedImg}
              setPreviewUrl={setPreviewUrl}
              showToast={showToast}
              croppedAreaPixels={croppedAreaPixels}
              setSelectedImage={setSelectedImage}
              imgLoading={imgLoading}
              handleClose={handleClose}
            />
          </motion.div>
        )}
        {step === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <StepPreview
              previewUrl={previewUrl}
              imgLoading={imgLoading}
              setPreviewUrl={setPreviewUrl}
              handleCropComplete={handleCropComplete}
            />
          </motion.div>
        )}
        {step === 'empty' && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, transform: 'translateX(0px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <StepEmpty
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="primary"
        className="!mt-4"
        onClick={() => setIsAvatarCropModalOpen(false)}
      >
        Закрыть
      </Button>
    </ModalBase>
  );
}
