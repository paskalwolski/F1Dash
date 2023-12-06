import { useState } from "react";
import { TableData } from "../../types/TableData";
import { Box, Typography, Button } from "@mui/material";
import { Settings } from "@mui/icons-material";
import ConfigPanel from "./ConfigPanel.component";
import { useTheme } from "@mui/material";

type Props<T extends TableData> = {
  visibleColumns: { [key in keyof T]: boolean };
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<{ [key in keyof T]: boolean } | undefined>
  >;
  keys: (keyof T)[];
};

const TableConfigPanel = <T extends TableData>({
  visibleColumns,
  setVisibleColumns,
  keys,
}: Props<T>) => {
  const theme = useTheme();
  const toggleConfig = () => {
    setConfigPanelOpen(!configPanelOpen);
  };

  const [configPanelOpen, setConfigPanelOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: configPanelOpen ? "inherit" : "flex-start",
      }}
    >
      <Box
        sx={{
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          borderRadius: "5px",
        }}
      >
        <Button
          onClick={toggleConfig}
          style={
            configPanelOpen
              ? {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  width: "100%",
                  borderRadius: 0,
                  padding: "5px 20px",

                  // border: "2px solid",
                }
              : {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
          }
        >
          <Settings />
          <Typography variant="body2">Table Settings</Typography>
        </Button>
        {configPanelOpen && (
          <ConfigPanel<T> {...{ keys, visibleColumns, setVisibleColumns }} />
        )}
      </Box>
    </Box>
  );
};

export default TableConfigPanel;
