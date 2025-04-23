import React from 'react';
import Button from '../Button';
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  }

  handleGoHome = () => {
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      const isApiError = this.state.error?.message?.includes('API') || 
                        this.state.error?.message?.includes('network');
      
      return (
        <div className="error-container" role="alert" aria-live="polite">
          <h2>Oops! Something went wrong</h2>
          <p className="error-message">
            {isApiError 
              ? "We're having trouble connecting to our servers. Please check your internet connection."
              : "We encountered an unexpected error. Our team has been notified."}
          </p>
          <div className="error-actions">
            <Button 
              text="Try Again" 
              onClick={this.handleRetry}
              outlined={false}
            />
            <Button 
              text="Go to Homepage" 
              onClick={this.handleGoHome}
              outlined={true}
            />
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary>Error Details</summary>
              <pre>{this.state.error?.toString()}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;