import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in UI:", error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fbf9ef] text-[#121212] flex flex-col items-center justify-center p-6 sm:p-12 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-[2rem] bg-white/90 border border-black/10 shadow-lg flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#FF5C00]/10 text-[#FF5C00] flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#121212]">
                Something Unexpected Occurred
              </h2>
              <p className="text-xs sm:text-sm text-[#121212]/70 leading-relaxed font-mono">
                {this.state.error?.message || "An application error occurred while rendering this view."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#121212] text-white hover:bg-[#FF5C00] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-black/20 text-[#121212] hover:border-[#FF5C00] hover:text-[#FF5C00] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
