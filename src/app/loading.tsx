export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-4 text-content-primary">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-surface-border border-t-lime animate-spin" />
        <span className="absolute font-mono text-xs font-bold text-lime">JM</span>
      </div>
      <p className="text-sm font-mono text-content-secondary tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}
