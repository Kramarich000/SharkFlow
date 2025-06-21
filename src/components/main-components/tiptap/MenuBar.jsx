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
    <div className="flex items-center gap-1 p-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {config.map((item) => {
        if (item.type === 'color-picker') {
          return (
            <input
              key={item.id}
              type="color"
              onInput={item.onInput}
              value={item.value}
              className="w-8 h-8 p-1 bg-transparent border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors duration-200"
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
            className={`p-2 rounded-md transition-all duration-200 ${
              item.isActive 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            } ${
              item.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-sm'
            }`}
            title={item.title}
          >
            {Icon ? <Icon size={16} /> : <span className="text-sm font-medium">{Content}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBar; 