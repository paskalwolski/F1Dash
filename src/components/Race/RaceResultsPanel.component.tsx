import { useMemo } from "react";
import { RaceResult } from "../../types/global";
import { Box } from "@mui/material";
import { TableDisplay } from "../TableDisplay/TableDisplay.component";
import { RaceResultTableData } from "../../types/TableData";

type Props = {
  results: RaceResult[] | undefined;
  resultId: string;
};

const RaceResultsPanel = ({ results, resultId }: Props) => {
  const tableData: RaceResultTableData[] | undefined = useMemo(() => {
    if (results) {
      return results.map((res) => {
        return {
          position: Number(res.position),
          number: Number(res.number),
          points: Number(res.points),
          Driver: res.Driver.givenName + " " + res.Driver.familyName,
          Constructor: res.Constructor.name,
          grid: Number(res.grid),
          laps: Number(res.laps),
          status: res.status,
          isFastestLap: res.FastestLap.rank == "1" ? true : false,
          fastestLapRank: Number(res.FastestLap.rank),
          fastestLapNumber: Number(res.FastestLap.lap),
          fastestLapTime: res.FastestLap.Time.time,
          AverageSpeed: Number(res.FastestLap.AverageSpeed.speed),
        };
      });
    }
  }, [resultId]);

  // const createResultsTableData: ResultsTableData = (result: Result) => {
  //   const currentTableData: ResultsTableData = {};
  // };

  // const raceResultTableData: ResultsTableData[] = useMemo(() => {
  //   return results.map((res) => {
  //     const resultTableData: ResultsTableData = {};
  //   });
  // }, [results]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {tableData ? (
        <TableDisplay
          {...{ keys: Object.keys(tableData[0]) ?? [], data: tableData }}
        />
      ) : (
        <>There was an error loading your table data</>
      )}
    </Box>
  );
};

export default RaceResultsPanel;
