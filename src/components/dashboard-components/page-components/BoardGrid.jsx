import BoardCard from '@components/dashboard-components/BoardCard';

const BoardGrid = ({ boards, onOpen, onTogglePin, onToggleFav }) => {
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
};

export default BoardGrid; 