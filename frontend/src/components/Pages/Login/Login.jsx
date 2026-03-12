import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../../../utils/authUtils";
import { useAuth } from "../../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const {login } = useAuth();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");


    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( !email || !password){
            setError("All fields are required");
            return;
        }
        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.post("/api/user/login",
                {email, password}
            );


            if (response.data.success) {
                    login(response.data.user, response.data.token); 
                    navigate("/home");
        }

            else{
                setError( response.data.message || "Login failed");
            }
        }
        catch(err){
            setError(  err.response.data.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }

    return (
    <div className="login-wrapper">
        <div className="login-card">
            <h1 className="brand-title">BLOG GENERATOR</h1>
            <p className="subtitle">Sign in to continue.</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@gmail.com" 
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="login-button">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            
            <div className="card-footer">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    </div>
);
}

export default Login;