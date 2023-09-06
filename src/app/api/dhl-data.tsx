import React from 'react';

interface JsonToTableProps {
  json: Record<string, any>;
}

const JsonToTable: React.FC<JsonToTableProps> = ({ json }) => {
  const tableRows = Object.keys(json)
    .map((key) => (
      <tr key={key}>
        <td>{json[key]}</td>
      </tr>
    ));

  return (
    <table>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default JsonToTable;
