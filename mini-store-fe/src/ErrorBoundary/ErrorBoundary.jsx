import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError() {
        return {hasError:true}
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error caught by Boundary")
        console.error(errorInfo)
        this.setState = {
            error,
            hasError:true
        }

    }

    render() {
         if(this.state.hasError) return(
            <>
                <div><p>Something went wrong...</p></div>
            </>
            )

            return this.props.children
    }
    
}

export default ErrorBoundary