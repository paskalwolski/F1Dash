import { memo } from "react";
import { Result } from "../../global";
import { Box } from "@mui/material";

type Props = {
  results: Result[];
};

const RaceResultsPanel = memo(({ results }: Props) => {
  return (
    <Box>
      {results.map((res: Result) => {
        return <>{res.points}</>;
      })}
    </Box>
  );
});

export default RaceResultsPanel;
