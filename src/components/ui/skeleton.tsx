
const CardSkeleton = () => (
  <div className="custom-card p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div
          className="h-5 w-32 bg-gray-200 rounded animate-shimmer bg-gradient-shimmer bg-no-repeat"
          style={{ backgroundSize: "1000px 100%" }}
        />
        <div
          className="h-4 w-40 bg-gray-200 rounded animate-shimmer bg-gradient-shimmer bg-no-repeat"
          style={{ backgroundSize: "1000px 100%" }}
        />
      </div>
      <div
        className="w-16 h-10 rounded-lg bg-gray-200 animate-shimmer bg-gradient-shimmer bg-no-repeat"
        style={{ backgroundSize: "1000px 100%" }}
      />
    </div>
  </div>
);

export default CardSkeleton;
