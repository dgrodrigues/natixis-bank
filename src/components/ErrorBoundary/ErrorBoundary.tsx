import { Component, ReactNode, ErrorInfo } from "react";

type ErrorBoundryProps = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundryProps, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Error caught: ", error, info);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <h2>Something went wrong.</h2>;
        }

        return children;
    }
}