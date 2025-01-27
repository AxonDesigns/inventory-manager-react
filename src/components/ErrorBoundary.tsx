import { Component, ReactNode } from 'react';

/**
 * Props for ErrorBoundary component.
 * @property {ReactNode} fallback - The UI to render when an error is caught.
 * @property {ReactNode} children - The child components wrapped by the ErrorBoundary.
 */
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * State for ErrorBoundary component.
 * @property {boolean} hasError - Flag indicating whether an error has been caught.
 * @property {Error | null} error - The error object if an error has occurred.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches JavaScript errors in its child component tree and displays a fallback UI.
 * Note: Error boundaries only catch errors in the components below them in the tree,
 * and won't catch errors in event handlers, async functions, or errors thrown from the ErrorBoundary itself.
 * 
 * @see https://17.reactjs.org/docs/concurrent-mode-suspense.html#handling-errors
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize the state with no error
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Lifecycle method triggered on error.
   * Updates the component's state when an error is encountered.
   * @param {Error} error - The error caught by the boundary.
   * @returns {ErrorBoundaryState} New state indicating an error has occurred.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Renders the fallback UI if an error has been caught, otherwise renders the children.
   * @returns {ReactNode} The fallback UI or the component's children.
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
