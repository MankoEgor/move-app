import React from 'react'

interface ErrorBoundaryProps{
    children: React.ReactNode;
};

interface ErrorBoundaryState{
    hasError: boolean;
};


class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    state = {hasError: false};

    static getDerivedStateFromError(){
        return {hasError: true};
    };

    componentDidCatch(error: Error): void {
        console.log('Ошибка :', error);
    }

    render(){
        if(this.state.hasError){
            return <h1>Что - то пошло не так</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;