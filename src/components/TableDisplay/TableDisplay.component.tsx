import { useEffect, useMemo, useState } from "react";
import { TableData } from "../../types/TableData";
import {
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";

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

  const [sortedData, setSortedData] = useState<T[]>(data);

  const [visibleColumns, setVisibleColumns] = useState<(keyof T)[]>(keys);
  const [sortByColumn, setSortByColumn] = useState<keyof T | undefined>(
    undefined
  );
  const [isAscending, setIsAscending] = useState<boolean | undefined>(
    undefined
  );

  const handleColumnClick = (k: keyof T) => {
    if (!isAscending) {
      setIsAscending(false);
    }

    setSortByColumn(k);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    if (sortByColumn) {
      const sortingData = [...data];
      sortingData.sort((a, b) => {
        const aVal = a[sortByColumn];
        const bVal = b[sortByColumn];

        let preSort = 0;

        if (aVal > bVal) {
          preSort = 1;
        } else if (aVal < bVal) {
          preSort = -1;
        } else {
          preSort = 0;
        }
        return isAscending ? preSort : preSort * -1;
        // return a[sortByColumn] - b[sortByColumn];
      });

      setSortedData(sortingData);
    }
  }, [isAscending, sortByColumn, data]);

  const getSortIcon = (kVal: keyof T) => {
    if (kVal === sortByColumn) {
      return isAscending ? (
        <KeyboardDoubleArrowUp />
      ) : (
        <KeyboardDoubleArrowDown />
      );
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {visibleColumns.map((k, i) => (
            <th
              key={"k" + i}
              onClick={() => {
                handleColumnClick(k);
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                {k.toString().toUpperCase()}
                {getSortIcon(k)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((entry: T, i) => {
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
