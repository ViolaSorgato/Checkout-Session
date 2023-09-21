import { message } from "antd";

// user-context.tsx
import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

// Define the interfaces

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

// Create a UserContext interface
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

// Initialize the context with default values
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

// Create the UserContext
export const UserContext = createContext<UserContext>(defaultValues);
export const useUserContext = () => useContext(UserContext);

// UserProvider component
const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  // const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  // Function to register a new user
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
        console.log(data);
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

  // Function to log the user out
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
