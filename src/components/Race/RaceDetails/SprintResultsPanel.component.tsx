import { useMemo } from "react";
import { SprintResultTableData } from "../../../types/TableData";
import { TableDisplay } from "../../TableDisplay/TableDisplay.component";
import { Box } from "@mui/material";

type Props = {
  results: SprintResult[];
  resultId: string;
};

export const SprintResultsPanel = ({ results, resultId }: Props) => {
  const tableData: SprintResultTableData[] = useMemo(() => {
    const tableDataContainer = results.map((res) => {
      return {
        position: Number(res.position),
        number: Number(res.number),
        points: Number(res.points),
        Driver: res.Driver.code,
        Constructor: res.Constructor.name,
        grid: Number(res.grid),
        laps: Number(res.laps),
        status: res.status,
        fastestLapNumber: Number(res.FastestLap?.lap),
        fastestLapTime: res.FastestLap?.Time.time,
      };
    });
    return tableDataContainer;
  }, [resultId]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {tableData ? (
        <TableDisplay<SprintResultTableData>
          {...{ data: tableData, resultId }}
        />
      ) : (
        <>There was an error loading your table data</>
      )}
    </Box>
  );
};

// return {
//   position: Number(res.position),
//   number: Number(res.number),
//   points: Number(res.points),
//   Driver: res.Driver.code,
//   Constructor: res.Constructor.name,
//   grid: Number(res.grid),
//   laps: Number(res.laps),
//   status: res.status,
//   fastestLapNumber: Number(res.FastestLap?.lap),
//   fastestLapTime: res.FastestLap?.Time.time,
// } as SprintResultTableData;
