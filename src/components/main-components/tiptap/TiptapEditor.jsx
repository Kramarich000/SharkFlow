import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useEffect, useState } from 'react';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import MenuBar from './MenuBar';

import {
  FaUnlink,
} from 'react-icons/fa';

const lowlight = createLowlight();

const TiptapEditor = ({ description, onChange }) => {
  const [isLowlightLoaded, setIsLowlightLoaded] = useState(false);

  useEffect(() => {
    import('@utils/lowlight-loader.js').then(module => {
      const common = module.common;
      lowlight.register(common);
      setIsLowlightLoaded(true);
    })
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: description,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'p-2 focus:outline-none !h-full tiptap-content',
      },
    },
  });
  
  useEffect(() => {
    if (editor && isLowlightLoaded) {
        // This is a trick to force re-render of the editor
        // once the languages are loaded to apply highlighting.
        const { from, to } = editor.state.selection;
        editor.commands.setContent(editor.getHTML(), false, { preserveWhitespace: 'full' });
        editor.commands.setTextSelection({ from, to });
    }
  }, [isLowlightLoaded, editor])

  return (
    <div className="!h-full relative">
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor }) => editor.isActive('link')}
          className="bg-white rounded-lg shadow-lg p-2 flex gap-2"
        >
          <input
            type="text"
            defaultValue={editor.getAttributes('link').href}
            onBlur={(e) =>
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: e.target.value })
                .run()
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: e.target.value })
                  .run();
              }
            }}
            className="input-styles !p-1 text-sm"
            placeholder="Enter URL"
          />
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="!p-1"
            title="Remove Link"
          >
            <FaUnlink />
          </button>
        </BubbleMenu>
      )}

      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap !h-full overflow-y-auto" />
    </div>
  );
};

export default TiptapEditor; 