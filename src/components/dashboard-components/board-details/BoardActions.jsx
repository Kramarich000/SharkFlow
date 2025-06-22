import React from 'react';

export default React.memo(function BoardActions({ 
  load, 
  onClose, 
  onDelete 
}) {
  return (
    <div className="flex gap-2 mt-auto">
      <button
        type="button"
        className="primary-btn !p-1 sm:!p-4 flex-1"
        onClick={onClose}
        disabled={load}
        title="Закрыть доску"
      >
        Закрыть
      </button>
      <button
        type="button"
        className="primary-btn !p-1 sm:!p-4 bg-red-600 hover:bg-red-700"
        onClick={onDelete}
        disabled={load}
        title="Удалить доску"
      >
        Удалить
      </button>
    </div>
  );
}); 