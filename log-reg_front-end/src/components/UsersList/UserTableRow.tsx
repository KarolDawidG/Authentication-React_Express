import { UsersListProps } from "../Utils/Interfaces/UsersListProps";
import { ENDPOINT_DELETE } from "../Utils/links";
import axios from 'axios';
import "../../css/tabela.css";
import { handleNetworkError } from "../Authentication/Login/handlers/networkErrorFunctions";


interface Props {
    user: UsersListProps;
}

export const UserTableRow = (props: Props) => {

    const handleDeleteUser = async () => {
        try {
          await axios.delete(`${ENDPOINT_DELETE}${props.user.id}`);
          window.location.reload();
        } catch (error: any) {
          handleNetworkError(error);
        }
      };
      
    return (
        <tr>
          <td>{props.user.id}</td>
          <td>{props.user.username}</td>
          <td>{props.user.email}</td>
          <td>{props.user.role}</td>
          <td><button onClick={() => handleDeleteUser()}>Usuń</button></td>
        </tr>
    )
}