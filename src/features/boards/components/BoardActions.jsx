import React from 'react';

function BoardActionsComponent() {
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
    </div>
  );
}

export const BoardActions = React.memo(BoardActionsComponent);
