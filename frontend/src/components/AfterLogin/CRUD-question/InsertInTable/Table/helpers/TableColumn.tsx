import "../QuestionTable.css";
import { TableColumnProps } from "../../../Interface/TableColumnProps";

export const TableColumn: React.FC<TableColumnProps> = ({
  value,
  placement,
  title,
}) => {
  return (
    <td
      className="custom-text-overflow"
      data-toggle="tooltip"
      data-placement={placement}
      title={title}
    >
      {value}
    </td>
  );
};
