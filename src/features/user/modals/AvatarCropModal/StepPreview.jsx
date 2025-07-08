import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function StepPreview({
  previewUrl,
  imgLoading,
  setPreviewUrl,
  handleCropComplete,
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={previewUrl}
        alt="Превью обрезки"
        className="w-48 h-48 sm:w-60 sm:h-60 object-cover border-2 !border-[var(--main-primary)] rounded-full mx-auto"
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
  );
} 