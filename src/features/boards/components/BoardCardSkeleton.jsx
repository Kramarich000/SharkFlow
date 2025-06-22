export function BoardCardSkeleton() {
  return (
    <div className="relative animate-pulse overflow-auto rounded-xl border-l-8 border-gray-200 bg-white p-4 shadow-lg">
      <div className="min-h-40 pt-8 flex items-center justify-center">
        <div className="h-8 w-4/5 rounded-md bg-gray-300"></div>
      </div>

      <div className="mt-4 flex w-full flex-col items-center space-y-2 md:items-start">
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
} 