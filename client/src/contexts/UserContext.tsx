import { createContext } from "react";

export interface User {
  _id: string;
  username: string;
  class: string;
}

export const UserContext = createContext<User | null>(null);
