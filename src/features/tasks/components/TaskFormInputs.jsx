import { Loader } from '@common/ui';
import { lazy, Suspense } from 'react';

const TiptapEditor = lazy(() => import('@common/tiptap/TiptapEditor'));

export const TaskFormInputs = ({
  title,
  setTitle,
  description,
  setDescription,
  handleCreateTask,
}) => {
  return (
    <>
      <div className="relative">
        <input
          autoFocus
          value={title ?? ''}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreateTask();
          }}
          className="peer input-styles"
          placeholder=" "
          required
        />
        <label className="label-styles">Введите название задачи</label>
      </div>
      <div className="relative h-full">
        <Suspense fallback={<Loader />}>
          <TiptapEditor
            description={description}
            onChange={(newDescription) => setDescription(newDescription)}
          />
        </Suspense>
      </div>
    </>
  );
};
