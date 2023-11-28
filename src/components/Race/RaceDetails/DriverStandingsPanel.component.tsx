import { useMemo } from "react";
import { DriverStandingTableData } from "../../../types/TableData";
import { DriverStanding } from "../../../types/global";
import { TableDisplay } from "../../TableDisplay/TableDisplay.component";
import { Box } from "@mui/material";

type Props = {
  results: DriverStanding[];
  resultId: string;
};

export const DriverStandingsPanel = ({ results, resultId }: Props) => {
  const tableData: DriverStandingTableData[] = useMemo(() => {
    const tableDataContainer = results.map((res) => {
      return {
        position: Number(res.position),
        positionText: res.positionText,
        Driver: res.Driver.code,
        points: Number(res.points),
        wins: Number(res.wins),
        Constructor: res.Constructors[0].name,
      };
    });
    return tableDataContainer;
  }, [resultId]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {tableData ? (
        <TableDisplay<DriverStandingTableData>
          {...{ data: tableData, resultId }}
        />
      ) : (
        <>There was an error loading your table data</>
      )}
    </Box>
  );
};
