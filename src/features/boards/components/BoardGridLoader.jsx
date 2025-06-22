import BoardCardSkeleton from './BoardCardSkeleton';

export function BoardGridLoader({ count = 10 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {Array.from({ length: count }).map((_, index) => (
        <BoardCardSkeleton key={index} />
      ))}
    </div>
  );
}
