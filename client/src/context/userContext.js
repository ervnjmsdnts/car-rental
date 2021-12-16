import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const UserContext = createContext({});

const useUser = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("http://localhost:8000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response && response.data) {
        setUser(response.data);
      }
    };
    getUser();
  }, [token]);

  return {
    user,
    login() {
      return new Promise((res) => {
        localStorage.setItem("isAuthed", true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        localStorage.removeItem("isAuthed");
        res();
      });
    },
  };
};

export const UserProvider = ({ children }) => {
  const auth = useUser();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const UserConsumer = () => useContext(UserContext);
