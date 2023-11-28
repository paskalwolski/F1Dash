import { useMemo } from "react";
import { ConstructorStandingTableData } from "../../../types/TableData";
import { ConstructorStanding } from "../../../types/global";
import { TableDisplay } from "../../TableDisplay/TableDisplay.component";
import { Box } from "@mui/material";

type Props = {
  results: ConstructorStanding[];
  resultId: string;
};

export const ConstructorStandingsPanel = ({ results, resultId }: Props) => {
  const tableData: ConstructorStandingTableData[] = useMemo(() => {
    const tableDataContainer = results.map((res) => {
      return {
        position: Number(res.position),
        positionText: res.positionText,
        points: Number(res.points),
        wins: Number(res.wins),
        Constructor: res.Constructor.name,
      };
    });
    return tableDataContainer;
  }, [resultId]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {tableData ? (
        <TableDisplay<ConstructorStandingTableData>
          {...{ data: tableData, resultId }}
        />
      ) : (
        <>There was an error loading your table data</>
      )}
    </Box>
  );
};
