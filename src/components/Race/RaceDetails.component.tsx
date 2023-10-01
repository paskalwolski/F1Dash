import { useContext } from "react";
import { RaceContext } from "../../contexts/ContextProvider";
import { Box, Typography } from "@mui/material";

export const RaceDetails = () => {
  const RaceCTX = useContext(RaceContext);

  const selectedRace = RaceCTX?.state.selectedRace;

  return (
    selectedRace && (
      <Box>
        <Typography variant="body1">
          Qualifying: {selectedRace.Qualifying.time}
        </Typography>
        <Typography variant="body2">
          First Practice: {selectedRace.FirstPractice.time}
        </Typography>
        <Typography variant="body2">
          Second Practice: {selectedRace.SecondPractice.time}
        </Typography>
        {selectedRace.ThirdPractice && (
          <Typography variant="body2">
            Third Practice: {selectedRace.ThirdPractice.time}
          </Typography>
        )}
      </Box>
    )
  );
};
