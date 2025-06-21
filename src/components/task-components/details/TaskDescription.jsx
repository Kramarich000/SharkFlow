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
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-800">Описание</h3>
        {isEditing && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Редактирование
          </span>
        )}
      </div>

      <div className="relative">
        {isEditing ? (
          <div className="bg-white border-2 border-blue-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300 focus-within:border-blue-400 focus-within:shadow-md">
            <div className="min-h-[400px] max-h-[600px] overflow-hidden">
              <TiptapEditor
                description={newDescription}
                onChange={setNewDescription}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-200 break-words hover:bg-gray-100 hover:border-gray-300">
            <HighlightingContent
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed tiptap-content break-words"
              html={task.description || '<p class="text-gray-500 italic">— Описание не добавлено —</p>'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDescription;
