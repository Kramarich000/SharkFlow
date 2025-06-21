import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import TiptapEditor from '@components/main-components/tiptap/TiptapEditor';
import HighlightingContent from '@components/main-components/HighlightingContent';

const TaskDescription = ({ task, newDescription, setNewDescription }) => {
  const { isEditing } = useTaskStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

  return (
    <div className="flex flex-col gap-2 min-w-0 w-full">
      {isEditing ? (
        <>
          <div className="md:min-h-[300px] bg-gray-50 rounded-2xl p-2 md:p-5 lg:overflow-y-hidden border border-gray-200 text-base max-w-full break-words">
            <div className="relative !h-full">
              <TiptapEditor
                description={newDescription}
                onChange={setNewDescription}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <b className="text-lg">Описание:</b>
          <HighlightingContent
            className="bg-gray-50 rounded-2xl p-2 md:p-5 h-full lg:overflow-y-hidden border border-gray-200 text-base max-w-full break-words tiptap-content"
            html={task.description || '<p>— Нет описания —</p>'}
          />
        </>
      )}
    </div>
  );
};

export default TaskDescription;
