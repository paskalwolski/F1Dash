import { useContext } from "react";
import { Race } from "../../global";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceInformationTabs } from "../../contexts/context.types";
import { RaceActions } from "../../contexts/race/raceReducer.actions";

interface PropTypes {
  race: Race;
}

export const RaceDisplay = ({ race }: PropTypes) => {
  // const [raceInfoDisplayFlag, setRaceInfoDisplayFlag] =
  //   useState<RaceInformation>(RaceInformation.details);

  const raceCTX = useContext(RaceContext);

  return (
    <Box
      sx={{
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 3,
        p: 2,
        pl: 4,
        borderColor: "primary.main",
      }}
    >
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
          value={raceCTX?.state.raceInfoTab}
          onChange={(_, v: RaceInformationTabs) => {
            raceCTX?.dispatch({ type: RaceActions.SET_INFO_TAB, payload: v });
          }}
          sx={{ pl: 2 }}
        >
          <Tab
            label={RaceInformationTabs.details}
            value={RaceInformationTabs.details}
            key={RaceInformationTabs.details}
          />
          <Tab
            label={RaceInformationTabs.results}
            value={RaceInformationTabs.results}
            key={RaceInformationTabs.results}
          />
          <Tab
            label={RaceInformationTabs.standings}
            value={RaceInformationTabs.standings}
            key={RaceInformationTabs.standings}
          />
        </Tabs>
        {
          {
            [RaceInformationTabs.details]: (
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
            [RaceInformationTabs.results]: <>Results go here!</>,
            [RaceInformationTabs.standings]: <>Season goes here!</>,
          }[raceCTX?.state.raceInfoTab ?? RaceInformationTabs.details]
        }
      </Box>
    </Box>
  );
};
