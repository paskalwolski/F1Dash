import { Box, Typography } from "@mui/material";
import { TableData } from "../../types/TableData";

type Props<T extends TableData> = {
  visibleColumns: { [key in keyof T]?: boolean };
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<{ [key in keyof T]?: boolean }>
  >;
  keys: (keyof T)[];
};

const ConfigPanel = <T extends TableData>({
  visibleColumns,
  setVisibleColumns,
  keys,
}: Props<T>) => {
  const getText = (key: keyof T): string => {
    const sKey = key.toString();
    const titleKey = sKey[0].toUpperCase() + sKey.slice(1);
    let newWord = "";
    let startOfWord = 0;
    for (let i = 1; i < titleKey.length; i++) {
      if (titleKey[i] === titleKey[i].toUpperCase()) {
        if (titleKey[i - 1] !== titleKey[i - 1].toUpperCase()) {
          if (newWord) {
            newWord += " ";
          }
          newWord += titleKey.slice(startOfWord, i);
          startOfWord = i;
        }
      }
    }
    newWord += titleKey.slice(startOfWord, titleKey.length);
    return newWord;
  };

  const toggleVisible = (k: keyof T) => {
    setVisibleColumns({ ...visibleColumns, [k]: !visibleColumns[k] });
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "5px 20px 10px 20px",
      }}
    >
      {keys.map((key) => {
        return (
          <div
            id={"row-" + key.toString()}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body1">{getText(key)}</Typography>
            <input
              id={"cb-" + key.toString()}
              type="checkbox"
              checked={visibleColumns[key]}
              onChange={() => {
                toggleVisible(key);
              }}
            ></input>
          </div>
        );
      })}
    </Box>
  );
};

export default ConfigPanel;
