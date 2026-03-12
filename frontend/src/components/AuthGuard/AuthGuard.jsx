import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    console.log("ProtectedRoute user:", user);

    if (!user) {
        console.log("Redirecting to login");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;