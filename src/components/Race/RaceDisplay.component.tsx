import { useState } from "react";
import { Race } from "../../global";
import { Box, Tab, Tabs, Typography } from "@mui/material";

interface propTypes {
  race: Race;
}

enum RaceInformation {
  blank,
  results,
  season,
}

export const RaceDisplay = ({ race }: propTypes) => {
  const [raceInfoDisplayFlag, setRaceInfoDisplayFlag] =
    useState<RaceInformation>(RaceInformation.blank);

  return (
    <Box sx={{ border: 4, borderRadius: 3, p: 2, bgcolor: "primary" }}>
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
      <Box>
        <Tabs
          value={raceInfoDisplayFlag}
          onChange={(_, v) => {
            setRaceInfoDisplayFlag(RaceInformation.[])
          }}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        {
          {
            [RaceInformation.blank]: (
              <Typography variant="body2">
                Choose some Race Details to View
              </Typography>
            ),
            [RaceInformation.results]: <>Results go here!</>,
            [RaceInformation.season]: <>Season goes here!</>,
          }[raceInfoDisplayFlag]
        }
      </Box>
    </Box>
  );
};
