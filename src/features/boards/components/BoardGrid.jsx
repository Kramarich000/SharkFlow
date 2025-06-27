import React from 'react';
import { BoardCard } from '@features/boards';

function BoardGridComponent({ boards, onOpen, onTogglePin, onToggleFav }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {boards.map((board) => (
        <BoardCard
          key={board.uuid}
          board={board}
          onOpen={onOpen}
          onTogglePin={onTogglePin}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}

export const BoardGrid = React.memo(BoardGridComponent);
