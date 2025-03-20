import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const userInfo = localStorage.getItem('isLoggedIn')
  
      if (userInfo === '1') {
        setIsLoggedIn(true);
      }
    }, [])
  
    const handleLogin = (email, password) => {
      localStorage.setItem('IsLoggedIn', '1')
      setIsLoggedIn(true);
    }
  
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn')
      setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, onLogout: handleLogout, onLogin: handleLogin }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default AuthContext;