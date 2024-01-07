import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext(null);

function ContextAuth({ children }) {
  // Check if there is a user in local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || null);

  // Update the user state when stored user changes
  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextAuth;
