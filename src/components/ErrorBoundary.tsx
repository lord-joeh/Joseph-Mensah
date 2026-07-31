import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full flex flex-col items-center justify-center p-12 text-center bg-background border border-destructive/20 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <div className="bg-destructive/10 p-4 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight text-foreground">Component Error</h2>
          <p className="text-muted-foreground mb-8 max-w-md text-sm">
            {this.state.error?.message || "An unexpected error occurred in this component."}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            variant="outline"
            className="gap-2 rounded-full"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
