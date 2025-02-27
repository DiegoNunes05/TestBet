export function Spinner({className = "h-4 w-4"}: {className?: string}) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${className}`}
    ></div>
  );
}
