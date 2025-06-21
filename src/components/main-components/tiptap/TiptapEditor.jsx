import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCode,
  FaLink,
  FaUnlink,
  FaTasks,
  FaHighlighter,
  FaTable,
} from 'react-icons/fa';
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from 'react-icons/ri';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useCallback } from 'react';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

const lowlight = createLowlight(common);

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: '' }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('bold') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('italic') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('strike') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('bulletList')
            ? 'is-active bg-gray-300'
            : 'bg-gray-200'
        }`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('orderedList')
            ? 'is-active bg-gray-300'
            : 'bg-gray-200'
        }`}
        title="Ordered List"
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('codeBlock') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Code Block"
      >
        <FaCode />
      </button>
      <button
        onClick={setLink}
        className={`p-2 rounded-lg ${
          editor.isActive('link') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Add/Edit Link"
      >
        <FaLink />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className={`p-2 rounded-lg disabled:opacity-50`}
        title="Remove Link"
      >
        <FaUnlink />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('taskList') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Task List"
      >
        <FaTasks />
      </button>
      <input
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color || '#000000'}
        className="w-8 h-8 p-1 bg-transparent border-none cursor-pointer"
        title="Text Color"
      />
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded-lg ${
          editor.isActive('highlight') ? 'is-active bg-gray-300' : 'bg-gray-200'
        }`}
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="p-2 rounded-lg"
        title="Insert Table"
      >
        <FaTable />
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
        className="p-2 rounded-lg"
        title="Add Column Before"
      >
        C-
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        className="p-2 rounded-lg"
        title="Add Column After"
      >
        C+
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        className="p-2 rounded-lg"
        title="Delete Column"
      >
        DC
      </button>
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
        className="p-2 rounded-lg"
        title="Add Row Before"
      >
        R-
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        className="p-2 rounded-lg"
        title="Add Row After"
      >
        R+
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        className="p-2 rounded-lg"
        title="Delete Row"
      >
        DR
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
        className="p-2 rounded-lg"
        title="Delete Table"
      >
        DT
      </button>
    </div>
  );
};

const TiptapEditor = ({ description, onChange }) => {
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