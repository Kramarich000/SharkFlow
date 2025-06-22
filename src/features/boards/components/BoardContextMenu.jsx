import { FaEdit, FaTrash, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function BoardContextMenu({
  onClose,
  onEdit,
  onDuplicate,
  onDelete,
  x,
  y,
}) {
  return (
    <motion.div
      className="fixed z-[100] rounded-xl bg-white p-2 shadow-2xl transform -translate-x-full"
      style={{ top: y, left: x }}
      onClick={onClose}
      initial={{ opacity: 0, transform: 'translateY(-10px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      exit={{ opacity: 0, transform: 'translateY(-10px)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <ul className="flex flex-col gap-1">
        {/* <li>

      
      <ul className="flex flex-col gap-1">
        {/* <li>
          <button
            onClick={onEdit}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-gray-100"
          >
            <FaEdit />
            <span>Редактировать</span>
          </button>
        </li> */}
        <li>
          <button
            onClick={onDuplicate}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-gray-100"
          >
            <FaCopy />
            <span>Дублировать</span>
          </button>
        </li>
        <li>
          <button
            onClick={onDelete}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-red-500 hover:bg-red-50"
          >
            <FaTrash />
            <span>Удалить</span>
          </button>
        </li>
      </ul>
    </motion.div>
  );
}
