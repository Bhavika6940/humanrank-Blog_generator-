import { Navigate } from "react-router-dom";
import { getToken} from "../../utils/authUtils";

const ProtectedRoute = ({ children}) => {
    const token = getToken();
    console.log("Token",token);

    if(!token){
        return <Navigate to="/" replace />
    }

    return children;
};
export default ProtectedRoute