import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token') === null ? false : true;

    if (isAuthenticated) {
        return <Navigate to="/" />
    }
    return children

}