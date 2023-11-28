import { useMemo } from "react";
import { QualiResultTableData } from "../../../types/TableData";
import { QualifyingResult } from "../../../types/global";
import { TableDisplay } from "../../TableDisplay/TableDisplay.component";
import { Box } from "@mui/material";

type Props = {
  results: QualifyingResult[];
  resultId: string;
};

export const QualiResultsPanel = ({ results, resultId }: Props) => {
  const tableData: QualiResultTableData[] = useMemo(() => {
    const tableDataContainer = results.map((res) => {
      return {
        number: Number(res.number),
        position: Number(res.position),
        Driver: res.Driver.code,
        Constructor: res.Constructor.name,
        Q1: res.Q1,
        Q2: res.Q2,
        Q3: res.Q3,
      };
    });
    return tableDataContainer;
  }, [resultId]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {tableData ? (
        <TableDisplay<QualiResultTableData>
          {...{ data: tableData, resultId }}
        />
      ) : (
        <>There was an error loading your table data</>
      )}
    </Box>
  );
};
