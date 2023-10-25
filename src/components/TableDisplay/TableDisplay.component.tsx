import { useState } from "react";
import { ResultsTableData } from "../../types/global";

type Props = {
  keys: string[];
  data: ResultsTableData[];
};
export const TableDisplay = ({ keys, data }: Props) => {
  const [visibleData, setVisibleData] = useState<string[]>(keys);

  return (
    <table>
      <thead>
        <tr>
          {keys.map((k) => (
            <th key={"k" + k}>{k.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((res) => {
          return (
            <tr key={"p" + res.position}>
              {keys.map((cell) => {
                const resultKey = cell as keyof ResultsTableData;
                return (
                  <td key={"p" + res.position + "d" + cell}>
                    {res[resultKey]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
