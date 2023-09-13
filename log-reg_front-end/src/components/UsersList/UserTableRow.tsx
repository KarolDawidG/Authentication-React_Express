import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UsersListProps } from "../Utils/Interfaces/UsersListProps";
import { ENDPOINT_DELETE, ENDPOINT_UPDATE } from "../Utils/links";
import axios from 'axios';
import "../../css/tabela.css";
import { handleNetworkError } from "../Authentication/Login/handlers/networkErrorFunctions";

interface Props {
    user: UsersListProps;
}

export const UserTableRow = (props: Props) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>(props.user.role); 
  
  const handleChangeRole = async () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
      try {
        await axios.put(`${ENDPOINT_UPDATE}/${props.user.username}/${newRole}`)
        setRole(newRole);
         
      } catch (error) {
        handleNetworkError(error);
      }
  }

    const handleDeleteUser = async () => {
        try {
          await axios.delete(`${ENDPOINT_DELETE}${props.user.id}`);
          
          navigate(0); 
        } catch (error: any) {
          handleNetworkError(error);
        }
      };
      
    return (
        <tr>
          <td>{props.user.id}</td>
          <td>{props.user.username}</td>
          <td>{props.user.email}</td>
          <td>{role}</td>
          <td><button  onClick={() => handleDeleteUser()}>Usuń</button></td>
          <td>
            <button  onClick={handleChangeRole}>
                {role === 'admin' ? 'na User' : 'na Admin'}
            </button>
          </td>
        </tr>
    )
}