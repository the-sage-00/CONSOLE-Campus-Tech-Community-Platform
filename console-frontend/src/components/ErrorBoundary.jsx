import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { logger } from '../utils/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error but suppress browser extension errors
    if (!error.message?.includes('extension port') && 
        !error.message?.includes('back/forward cache')) {
      logger.error('Application Error:', error);
      logger.error('Error Info:', errorInfo);
      
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Refresh the page to reset the app state
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-2xl">
              {/* Error Icon */}
              <div className="text-red-500 text-6xl mb-6 flex justify-center">
                <AlertTriangle className="w-16 h-16" />
              </div>
              
              {/* Error Title */}
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Oops! Something went wrong
              </h1>
              
              {/* Error Description */}
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                We encountered an unexpected error. Don't worry, this happens sometimes! 
                Click the button below to refresh the page and try again.
              </p>
              
              {/* Error Details (Development Mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-700">
                  <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                    Technical Details (Development Mode)
                  </summary>
                  <div className="text-sm text-gray-400 font-mono">
                    <p className="mb-2"><strong>Error:</strong> {this.state.error.toString()}</p>
                    {this.state.errorInfo && (
                      <pre className="whitespace-pre-wrap text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 mr-3 group-hover:animate-spin" />
                  Refresh Page
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-600 hover:border-gray-500"
                >
                  Go Back
                </button>
              </div>
              
              {/* Help Text */}
              <p className="text-gray-500 text-sm mt-6">
                If this problem persists, please contact support or try using a different browser.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
