import { useEffect, useState } from "react";
import { Race } from "../../global";
import { Box, Tab, Tabs, Typography } from "@mui/material";

interface PropTypes {
  race: Race;
}

enum RaceInformation {
  details = "Details",
  results = "Results",
  standings = "Standings",
}

export const RaceDisplay = ({ race }: PropTypes) => {
  const [raceInfoDisplayFlag, setRaceInfoDisplayFlag] =
    useState<RaceInformation>(RaceInformation.details);

  useEffect(() => {
    console.log(raceInfoDisplayFlag);
  }, [raceInfoDisplayFlag]);

  return (
    <Box sx={{ border: 1, borderRadius: 3, p: 2, pl: 4, bgcolor: "primary" }}>
      <Typography variant="h3" sx={{ pb: 1 }}>
        {race.raceName}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="subtitle1" fontWeight={100} pr={1}>
          Round {race.round} |
        </Typography>
        <Typography variant="subtitle1">
          {race.Circuit.circuitName} on {race.date}
        </Typography>
      </div>
      <Box>
        <Tabs
          value={raceInfoDisplayFlag}
          onChange={(_, v: RaceInformation) => {
            setRaceInfoDisplayFlag(v);
          }}
          sx={{ pl: 2 }}
        >
          {Object.values(RaceInformation).map((raceInfo: string) => {
            // const raceInfoVal = raceInfo as keyof typeof RaceInformation;
            return (
              // <Tab label={RaceInformation[raceInfoVal]} value={raceInfoVal} />
              <Tab label={raceInfo} value={raceInfo} key={raceInfo} />
            );
          })}
        </Tabs>
        {
          {
            [RaceInformation.details]: (
              <Box sx={{ ml: 2 }}>
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
            ),
            [RaceInformation.results]: <>Results go here!</>,
            [RaceInformation.standings]: <>Season goes here!</>,
          }[raceInfoDisplayFlag]
        }
      </Box>
    </Box>
  );
};
