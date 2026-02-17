'use client';

import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="glass rounded-2xl p-8 text-center text-white">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-200" />
              <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
              <p className="text-white/80 mb-6">
                We encountered an unexpected error. Don't worry, this has been logged and we're working on it.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={this.handleRetry}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-medium"
                >
                  Reload Page
                </button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-white/60 hover:text-white/80">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-3 bg-black/20 rounded-lg text-xs font-mono text-white/70 overflow-auto max-h-32">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
