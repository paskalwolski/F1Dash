import { useMemo, useState } from "react";
import { TableData } from "../../types/TableData";

type Props<T extends TableData> = {
  data: T[];
  resultId: string;
};
export const TableDisplay = <T extends TableData>({
  data,
  resultId,
}: Props<T>) => {
  const keys: (keyof T)[] = useMemo(() => {
    const egKeys = Object.keys(data[0]);
    const finalKeys = egKeys as (keyof T)[];
    return finalKeys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultId]);

  const [visibleData, setVisibleData] = useState<(keyof T)[]>(keys);

  return (
    <table>
      <thead>
        <tr>
          {keys.map((k, i) => (
            <th key={"k" + i}>{k.toString().toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry: T, i) => {
          return (
            <tr key={"r" + i}>
              {keys.map((cell, j) => {
                const resultKey = cell as keyof T;
                return (
                  <td key={"r" + i + "c" + j}>{entry[resultKey] as string}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
