import { message } from "antd";
import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

//INTERFACES

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface NewUser {
  email: string;
  username: string;
  password: string;
}

export interface RegisteredUser {
  username: string;
  password: string;
}

//CONTEXT
export interface UserContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  authorization: () => void;
  registerUser: (newUser: NewUser) => Promise<void>;
  login: (registeredUser: RegisteredUser) => void;
  logout: () => void;
  loggedInUser?: User | null;
}

// DEFAULT VALUES
const defaultValues: UserContext = {
  username: "",
  setUsername: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  authorization: () => {},
  registerUser: async () => {},
  login: async () => {},
  logout: () => {},
  loggedInUser: null,
};

// CREATE AND USE CONTEXT
export const UserContext = createContext<UserContext>(defaultValues);
export const useUserContext = () => useContext(UserContext);

// PROVIDER
const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //AUTH
  const authorization = async () => {
    try {
      const response = await fetch("/api/users/authorize");
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        setloggedInUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  // FUNCTION TO REGISTER NEW USER
  const registerUser = async (newUser: NewUser) => {
    try {
      const response = await fetch("api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        message.success(
          "Wow! You are registered as a new customer! Now please log in."
        );
      } else if (response.status === 400) {
        message.error(
          "There is already an account with these credentials. Please log in instead."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //LOGIN FUNCTION
  const login = async (user: RegisteredUser) => {
    if (user) {
      try {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status === 200) {
          setloggedInUser(data);
          message.success("Wow! You logged in successfully!");
        }
        if (response.status === 401) {
          message.error(
            "This account does not exist. Please register instead."
          );
        }
      } catch (error) {}
    }
  };

  //LOGOUT FUNCTION
  const logout = async () => {
    try {
      const response = await fetch("api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setloggedInUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        authorization,
        registerUser,
        login,
        logout,
        loggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
