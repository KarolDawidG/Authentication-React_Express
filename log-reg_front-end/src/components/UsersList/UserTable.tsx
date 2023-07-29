import { UserTableRow } from "./UserTableRow";
import { UsersListProps } from "./UsersListProps";
import "./tabela.css";

interface UserTableProps  {
    users: UsersListProps[];
}

export const UserTable: React.FC<UserTableProps > = (props) => (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Email</th>
                <th>Rola</th>
            </tr>
        </thead>
        <tbody>
            {
                props.users.map(user => (
                <UserTableRow user={user} key={user.id}/>
                ))
            }
        </tbody>
    </table>

);