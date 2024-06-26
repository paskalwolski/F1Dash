import { useEffect, useState } from "react";
import { TableData } from "../../types/TableData";
import {
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

type Props<T extends TableData> = {
  keys: (keyof T)[];
  data: T[];
  visibleColumns: { [key in keyof T]?: boolean };
};
export const TableDisplay = <T extends TableData>({
  keys,
  data,
  visibleColumns,
}: Props<T>) => {
  const theme = useTheme();

  const [sortedData, setSortedData] = useState<T[]>(data);

  useEffect(() => {
    setSortedData(data);
    setSortByColumn(undefined);
    setIsAscending(undefined);
  }, [data]);

  const [sortByColumn, setSortByColumn] = useState<keyof T | undefined>(
    undefined
  );
  const [isAscending, setIsAscending] = useState<boolean | undefined>(
    undefined
  );

  const handleColumnClick = (k: keyof T) => {
    if (sortByColumn === k) {
      setIsAscending(!isAscending);
    } else {
      setIsAscending(true);
      setSortByColumn(k);
    }
  };

  const toTitleCase = (k: keyof T): string => {
    const sval = k.toString();
    return sval.slice(0, 1).toUpperCase() + sval.slice(1);
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
        <KeyboardDoubleArrowDown sx={{ fontSize: 20 }} />
      ) : (
        <KeyboardDoubleArrowUp sx={{ fontSize: 20 }} />
      );
    }
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
        }}
      >
        <thead>
          {/* // TODO: Add in sections for top panel, and table panel. Scroll to hide top panel, then continue scrolling through table.
        // This also lets the thead be sticky
        <thead style={{ position: "sticky", top: "20px" }}> */}
          <tr
            style={{
              minHeight: "1.2rem",
              borderBottom: "2px solid black",
            }}
          >
            {keys.map(
              (k, i) =>
                visibleColumns[k] && (
                  <th
                    key={"k" + i}
                    style={{
                      paddingBottom: "5px",
                      paddingTop: "5px",
                      color:
                        k === sortByColumn
                          ? theme.palette.info.dark
                          : undefined,
                    }}
                    onClick={() => {
                      handleColumnClick(k);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "1rem",
                        marginLeft: "5px",
                      }}
                    >
                      <Typography variant="h6">{toTitleCase(k)}</Typography>
                      <div
                        style={{
                          minWidth: "20px",
                          maxWidth: "30px",
                          paddingRight: "2px",
                          paddingTop: "3px",
                        }}
                      >
                        {getSortIcon(k)}
                      </div>
                    </div>
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry: T, i) => {
            return (
              <tr
                key={"r" + i}
                style={{
                  minHeight: "1.2rem",
                  borderBottom: "1px solid gray",
                }}
              >
                {keys.map((cell, j) => {
                  const resultKey = cell as keyof T;
                  return (
                    visibleColumns[cell] && (
                      <td
                        key={"r" + i + "c" + j}
                        style={{
                          whiteSpace: "nowrap",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            padding: "2px 3px 2px 5px",
                            backgroundColor:
                              resultKey === sortByColumn
                                ? theme.palette.info.light
                                : undefined,
                          }}
                        >
                          {(entry[resultKey] as string).toString()}
                        </Typography>
                      </td>
                    )
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};
