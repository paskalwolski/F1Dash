import { useMemo, useState } from "react";
import { TableData } from "../../types/TableData";
import { Box, Typography } from "@mui/material";
import { TableDisplay } from "./TableDisplay.component";
import TableConfigPanel from "./TableConfigPanel.component";
import { fetchDataByType } from "./TableDataParser.util";

type Props = {
  data: RawResultData[];
  resultId: string;
  dataType: RawResultTypes;
};

const TableContainer = <T extends TableData>({
  data,
  resultId,
  dataType,
}: Props) => {
  const [visibleColumns, setVisibleColumns] = useState<{
    [key in keyof T]: boolean;
  }>();

  const tableData = fetchDataByType<T>(dataType, data);

  const keys: (keyof T)[] = useMemo(() => {
    const egKeys = Object.keys(tableData[0]);
    const finalKeys = egKeys as (keyof T)[];
    const candidateKeys: { [key in keyof T]: boolean } = {};
    finalKeys.map((key) => {
      candidateKeys[key] = true;
    });
    setVisibleColumns(candidateKeys);
    console.log(finalKeys);
    return finalKeys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultId, data]);

  return visibleColumns ? (
    <Box>
      <TableDisplay<T> {...{ keys, data: tableData, visibleColumns }} />
      <TableConfigPanel<T> {...{ visibleColumns, setVisibleColumns, keys }} />
    </Box>
  ) : (
    <Typography variant="body1">
      There was a problem with your table data. Please try again
    </Typography>
  );
};

export default TableContainer;
