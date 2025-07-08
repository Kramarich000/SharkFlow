import Cropper from 'react-easy-crop';
import { Button } from '@common/ui/utilities/Button';

export function StepCropper({
  selectedImage,
  crop,
  zoom,
  setCrop,
  setZoom,
  setCroppedAreaPixels,
  getCroppedImg,
  setPreviewUrl,
  showToast,
  croppedAreaPixels,
  setSelectedImage,
  imgLoading,
  handleClose,
}) {
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
} 