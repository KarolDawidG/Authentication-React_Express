import { UsersListProps } from "../Utils/Interfaces/UsersListProps";
import "../../css/tabela.css";

interface Props {
    user: UsersListProps;
}

export const UserTableRow = (props: Props) => {
    return (
        <tr>
        <td>{props.user.id}</td>
        <td>{props.user.username}</td>
        <td>{props.user.email}</td>
        <td>{props.user.role}</td>
    </tr>
    )
}