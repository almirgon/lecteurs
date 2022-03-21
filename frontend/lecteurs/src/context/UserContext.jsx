import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserStorage = ({children}) => {
  const [authorized, setAuthorized] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")),
  );
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("id")));

  return (
    <UserContext.Provider
      value={{
        authorized,
        setAuthorized,
        username,
        setUsername,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
