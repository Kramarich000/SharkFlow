import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

export const getExtensions = (lowlight) => [
  StarterKit,
  // CodeBlockLowlight.configure({
  //   lowlight,
  // }),
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
]; 