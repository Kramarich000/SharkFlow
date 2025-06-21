import { useCallback } from 'react';
import { getMenuBarConfig } from './menu-bar-config';
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

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previousUrl = editor.getAttributes('link').href;
    // You can handle the URL input with a custom modal or prompt in a real app
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const config = getMenuBarConfig(editor, setLink);

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-lg">
      {config.map((item) => {
        if (item.type === 'color-picker') {
          return (
            <input
              key={item.id}
              type="color"
              onInput={item.onInput}
              value={item.value}
              className="w-8 h-8 p-1 bg-transparent border-none cursor-pointer"
              title={item.title}
            />
          );
        }

        const { Icon, Content } = item;
        return (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className={`p-2 rounded-lg disabled:opacity-50 ${
              item.isActive ? 'is-active bg-gray-300' : 'bg-gray-200'
            }`}
            title={item.title}
          >
            {Icon ? <Icon /> : Content}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBar; 