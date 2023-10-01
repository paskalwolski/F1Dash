import React from "react";
import { Race } from "../../global";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";

import {
  RaceActionTypes,
  RaceActions,
} from "../../contexts/race/raceReducer.actions";
import { RaceInformationTabs } from "../../contexts/context.types";

interface propTypes {
  race: Race;
  // selectRace: React.Dispatch<React.SetStateAction<Race | undefined>>;
  displayOnly?: boolean;
  dispatchRaceContext: React.Dispatch<RaceActionTypes>;
  // actionAreaClick?: CallableFunction;
  // resultButtonClickAction?: CallableFunction;
  // standingsButtonClickAction?: CallableFunction;
}

export const RaceCard = ({
  race,
  // selectRace,
  displayOnly,
  dispatchRaceContext,
}: // actionAreaClick,
// resultButtonClickAction,
// standingsButtonClickAction,
propTypes) => {
  return (
    <Card
      sx={{
        borderStyle: "solid",
        borderWidth: "3px",
        borderColor: "primary.main",
        borderRadius: "5px",
        // backgroundColor: "info.dark",
      }}
    >
      <CardActionArea
        onClick={
          displayOnly
            ? undefined
            : () => {
                dispatchRaceContext({
                  type: RaceActions.SET_RACE,
                  payload: { race },
                });
              }
        }
      >
        <CardContent>
          <Typography variant="h6">{race.raceName}</Typography>
          <Typography>Round {race.round}</Typography>
          {/* <Typography sx={{ fontWeight: "10" }}>{race.date}</Typography> */}
        </CardContent>
      </CardActionArea>
      {!displayOnly && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatchRaceContext({
                type: RaceActions.SET_RACE,
                payload: {
                  race,
                  infoTab: RaceInformationTabs.results,
                },
              });
            }}
          >
            Results
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatchRaceContext({
                type: RaceActions.SET_RACE,
                payload: {
                  race,
                  infoTab: RaceInformationTabs.standings,
                },
              });
            }}
          >
            Standings
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
