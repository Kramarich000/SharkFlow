import React from 'react';

function BoardActionsComponent({ onClose, load }) {
  return (
    <div className="flex gap-2 mt-auto">
      <button
        type="button"
        className={`btn-primary flex-1 ${load ? ' btn-loading' : ''}`}
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
