import { createContext, useState } from "react";

export const Login_data = createContext(null);

function Context({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Login_data.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Login_data.Provider>
  );
}

export default Context;