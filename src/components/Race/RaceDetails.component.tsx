// import { useContext } from "react";
// import { RaceContext } from "../../contexts/ContextProvider";
import { Box, Typography } from "@mui/material";
import { Race } from "../../types/global";

type Props = {
  race: Race;
};

export const RaceDetails = ({ race }: Props) => {
  // const RaceCTX = useContext(RaceContext);
  // const race = RaceCTX?.state.race;

  return (
    race && (
      <Box>
        <Typography variant="body1">
          Qualifying: {race.Qualifying.time}
        </Typography>
        <Typography variant="body2">
          First Practice: {race.FirstPractice.time}
        </Typography>
        <Typography variant="body2">
          Second Practice: {race.SecondPractice.time}
        </Typography>
        {race.ThirdPractice && (
          <Typography variant="body2">
            Third Practice: {race.ThirdPractice.time}
          </Typography>
        )}
      </Box>
    )
  );
};
