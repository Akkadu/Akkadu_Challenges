import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <header>
            <div>
                <h3 className="float-md-start mb-0">Avacode</h3>
                <nav style={{flexWrap: 'nowrap'}} className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    { user ? <NavLink onClick={() => logoutUser()} className="nav-link" to="/account">Logout</NavLink>
                    : <NavLink className="nav-link" to="/account">Login</NavLink>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Navbar;