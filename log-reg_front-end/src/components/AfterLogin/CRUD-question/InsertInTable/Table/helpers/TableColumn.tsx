import "../QuestionTable.css";

interface TableColumnProps {
  value: string;
  placement: string;
  title: string;
}

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
