import { useMemo, useState } from "react";
import { TableData } from "../../types/TableData";
import { Box, Button, Typography } from "@mui/material";
import { TableDisplay } from "./TableDisplay.component";

type Props<T extends TableData> = {
  data: T[];
  resultId: string;
};

const TableContainer = <T extends TableData>({ data, resultId }: Props<T>) => {
  const keys: (keyof T)[] = useMemo(() => {
    const egKeys = Object.keys(data[0]);
    const finalKeys = egKeys as (keyof T)[];
    return finalKeys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultId]);

  const [visibleColumns, setVisibleColumns] = useState<(keyof T)[]>(keys);

  return (
    <Box>
      <TableDisplay<T> {...{ data, visibleColumns }} />
      <Button>
        <Typography variant="body2">Click Me!</Typography>
      </Button>
    </Box>
  );
};

export default TableContainer;
