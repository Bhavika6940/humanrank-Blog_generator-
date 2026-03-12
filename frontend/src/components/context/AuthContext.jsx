import { createContext , useContext , useState} from "react";
import { getUser, setUser, setToken, removeToken, removeUser} from "../../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    
    const [user, setUserState] = useState(getUser());

    const login = (userData , token) => {
           setUser(userData);
            setToken(token);
            setUserState(userData);
        };

    const logout = () => {
            removeToken();
           removeUser();
            setUserState(null);
        };

        return (
            <AuthContext.Provider value = {{user, login , logout}}>
                {children}
            </AuthContext.Provider>
        )
 };

export const useAuth = () => useContext(AuthContext);