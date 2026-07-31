import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from './ui/button';

export default function RouteError() {
  const error = useRouteError();
  console.error("Route error:", error);

  let errorMessage = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-background text-foreground selection:bg-primary/30">
      <div className="bg-destructive/10 p-6 rounded-full mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertTriangle className="w-16 h-16 text-destructive animate-pulse" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        Oops! Something went wrong.
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
        {errorMessage}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => window.location.reload()} size="lg" className="gap-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2 rounded-full border-white/10 hover:bg-white/5">
          <Link to="/">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
