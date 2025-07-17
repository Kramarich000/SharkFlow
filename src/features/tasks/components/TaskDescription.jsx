import { lazy, Suspense } from 'react';
import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '@features/tasks';
const TiptapEditor = lazy(() => import('@common/tiptap/TiptapEditor'));
import { HighlightingContent } from '@common/ui';

export const TaskDescription = ({
  task,
  newDescription,
  setNewDescription,
}) => {
  const { isEditing } = useTaskStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-800">Описание</h3>
      </div>

      <div className="relative border-gray-200">
        {isEditing ? (
          <div className="bg-white border-2 rounded-xl border-gray-200 shadow-sm transition-all duration-200 hover:border-gray-300 focus-within:border-gray-500 focus-within:shadow-md">
            <div className="min-h-[400px] max-h-[600px] overflow-hidden">
              <Suspense fallback={<div>Загрузка редактора...</div>}>
                <TiptapEditor
                  description={newDescription}
                  onChange={setNewDescription}
                />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-200 break-words hover:bg-gray-100 hover:border-gray-300">
            <HighlightingContent
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed tiptap-content break-words"
              html={
                task.description ||
                '<p class="text-gray-500 italic">— Описание не добавлено —</p>'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
