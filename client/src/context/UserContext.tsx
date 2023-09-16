import { ReactNode, createContext, useState, useEffect } from "react";

export type User = {
  username: string;
  email: string;
  password: string;
};

export type UserType = {
  username: string;
  password: string;
};

interface UserContext {
  loggedInUser?: User | null;
  login: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
}
const defaultValues = {
  loggedInUser: null,
  login: async () => {},
  logout: async () => {},
};

type Props = {
  children: ReactNode;
};

export const UserContextType = createContext<UserContext>(defaultValues);

const UserProvider = ({ children }: Props) => {
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);

  //   useEffect(() => {
  //     const authorization = async () => {
  //       try {
  //         const response = await fetch("/api/users/authorize");
  //         const data = await response.json();
  //         if (response.status === 200 || response.status === 304) {
  //           setloggedInUser(data);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     authorization();
  //   }, []);

  const login = async (user: UserType) => {
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
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setloggedInUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContextType.Provider
      value={{ loggedInUser, login: login, logout: logout }}
    >
      {children}
    </UserContextType.Provider>
  );
};

export default UserProvider;
