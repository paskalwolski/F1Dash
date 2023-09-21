import React from "react";
import { Race } from "../../global";
import { Box, Typography } from "@mui/material";

interface propTypes {
  race: Race;
}

export const RaceDisplay = ({ race }: propTypes) => {
  return (
    <Box sx={{ border: 4, borderRadius: 3, m: 2, p: 2 }}>
      <Typography variant="h3" sx={{ pb: 1 }}>
        {race.raceName}
      </Typography>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1">
          Held at the {race.Circuit.circuitName} on {race.date}
        </Typography>
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
    </Box>
  );
};
