import React, { useContext } from "react";
import { UserTableRow } from "./UserTableRow";
import { UsersContext } from "../Utils/Interfaces/UsersContext";
import "../../css/tabela.css";


export const UserTable: React.FC = () => {
    const usersList = useContext(UsersContext);

    if (!usersList) {
        return null;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Email</th>
                <th>Rola</th>
                <th>Usun</th>
            </tr>
            </thead>
            <tbody>
            {usersList.map((user) => (
                <UserTableRow user={user} key={user.id} />
            ))}
            </tbody>
        </table>
    );
};
