import React from "react";
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

interface propTypes {
  race: Race;
  // selectRace: React.Dispatch<React.SetStateAction<Race | undefined>>;
  displayOnly?: boolean;
  dispatchRaceContext: React.Dispatch<RaceActionTypes>;
  // actionAreaClick?: CallableFunction;
  // resultButtonClickAction?: CallableFunction;
  // standingsButtonClickAction?: CallableFunction;
}

export const RaceCard = React.memo(
  ({
    race,
    // selectRace,
    displayOnly,
    dispatchRaceContext,
  }: // actionAreaClick,
  // resultButtonClickAction,
  // standingsButtonClickAction,
  propTypes) => {
    const shortenRaceName = (raceName: string): string => {
      const splitName = raceName.split(" ").slice(0, -2);
      splitName.push("GP");
      return splitName.join(" ");
    };

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
            <Typography variant="h6">
              {shortenRaceName(race.raceName)}
            </Typography>
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
                    infoTab: "Results",
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
                    infoTab: "Qualifying",
                  },
                });
              }}
            >
              Qualifying
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }
);
