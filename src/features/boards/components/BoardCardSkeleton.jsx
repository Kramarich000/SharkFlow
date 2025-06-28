export function BoardCardSkeleton() {
  return (
    <div className="relative overflow-auto rounded-xl border-l-8 border-1 border-[var(--main-primary)] p-4 shadow-lg">
      <div className="min-h-40 pt-8 flex items-center justify-center">
        <div className="h-8 w-4/5 rounded-md shimmer"></div>
      </div>

      <div className="mt-4 flex w-full flex-col items-center space-y-2 md:items-start">
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded shimmer"></div>
          <div className="h-4 w-1/2 rounded shimmer"></div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded shimmer"></div>
          <div className="h-4 w-1/2 rounded shimmer"></div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded shimmer"></div>
          <div className="h-4 w-1/2 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
}
