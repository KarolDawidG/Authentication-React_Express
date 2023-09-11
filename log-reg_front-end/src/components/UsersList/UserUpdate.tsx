import React, { useContext, useState } from "react";
import { UsersListProps } from "../Utils/Interfaces/UsersListProps";
import { UsersContext } from "../Utils/Interfaces/UsersContext";
import axios from "axios";

interface UserFilterProps {
  usersList: UsersListProps[]; 
}

export const UserUpdate: React.FC<UserFilterProps> = () => {
  const usersList = useContext(UsersContext);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  if (!usersList) {
      return null;
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };


  const handleSubmit = () => {
    axios.put(`http://localhost:3001/users/${selectedUser}/${selectedRole}` )
    
    window.location.reload();
  };


    return (
        <td colSpan={5}>
            <select value={selectedUser || ""} onChange={handleUserChange}>
            <option value=""></option>
                {usersList.map((user) => (
                    <option key={user.id} value={user.username}>
                        {user.username}
                    </option>
                ))}
            </select>

            <select value={selectedRole} onChange={handleRoleChange}>
                <option value=""></option>
                <option value='admin'> Admin </option>
                <option value='user'> User </option>
            </select>

            <button onClick={handleSubmit}> Zapisz zmiany</button>
        </td>
    );
};

