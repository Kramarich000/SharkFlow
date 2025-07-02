import React from 'react';
import { Button } from '@common/ui/utilities/Button';

function BoardActionsComponent({ onClose, load }) {
  return (
    <div className="flex gap-2 mt-auto">
      <Button
        variant="primary"
        onClick={onClose}
        disabled={load}
        title="Закрыть доску"
      >
        Закрыть
      </Button>
    </div>
  );
}

export const BoardActions = React.memo(BoardActionsComponent);
