export default function LoadingSkeleton() {
  return (
    <div className="glass rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-hacker-gray-light rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-hacker-gray-light rounded w-full mb-2"></div>
      <div className="h-4 bg-hacker-gray-light rounded w-5/6 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-hacker-gray-light rounded w-20"></div>
        <div className="h-6 bg-hacker-gray-light rounded w-16"></div>
      </div>
    </div>
  )
}

