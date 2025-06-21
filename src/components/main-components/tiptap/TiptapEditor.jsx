import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCode,
} from 'react-icons/fa';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';

const lowlight = createLowlight(common);

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-lg">
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
    ],
    content: description,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none !h-full',
      },
    },
  });

  return (
    <div className="!h-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="!h-full" />
    </div>
  );
};

export default TiptapEditor; 