import { createContext } from "react";
import { UsersListProps } from "./UsersListProps";

export const UsersContext = createContext<UsersListProps[] | null>(null);
