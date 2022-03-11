import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserStorage = ({children}) => {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider
      value={{authorized, setAuthorized, username, setUsername}}
    >
      {children}
    </UserContext.Provider>
  );
};
