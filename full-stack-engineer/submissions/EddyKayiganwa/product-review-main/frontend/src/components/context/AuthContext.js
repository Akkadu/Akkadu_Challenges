import { useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const localToken = localStorage.getItem("authTokens");
    const [user, setUser] = useState(() =>
        localToken ? jwtDecode(localToken) : null
    );
    const [authToken, setAuthToken] = useState(() =>
        localToken ? localToken : null
    );

    const loginUser = async(email, password) => {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        if(response.status === 201) {
            setAuthToken(data.token);
            setUser({id: data._id, name: data.name, email: data.email});
            localStorage.setItem("authTokens", data.token);
            return true;
        }
        else {
            return false;
        }
    };

    const logoutUser = () => {
		setAuthToken(null);
		setUser(null);
		localStorage.removeItem("authTokens");
	};

    const contextData = {
        user,
        authToken,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;