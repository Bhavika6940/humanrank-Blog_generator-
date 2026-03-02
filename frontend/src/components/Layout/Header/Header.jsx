import { NavLink } from 'react-router-dom';
import "./Header.css"

const Header = () => {
    return(
        <header className= "header">
         <div className="header-container">
            <div className="logo">
                 BLOG GENERATOR
            </div>
               
        <nav className= "nav-links">
            <NavLink to = "/home" className="nav-item">
              Home
            </NavLink>
            <NavLink to= "/create" className="nav-item">
                Create Blog
            </NavLink>
            <NavLink to= "/editor" className="nav-item">
                Editor
            </NavLink>
           
            <NavLink to= "/history" className="nav-item">
                 Blog History
            </NavLink> 

        </nav>
        </div> 
    </header>

    )
    
};

export default Header;