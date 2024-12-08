import { createContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        name: ""
    }
});

const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            name: ""
        }
    });
    return (
        <AuthContext.Provider value={{
            auth, setAuth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthWrapper }