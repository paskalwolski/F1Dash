import React from "react";

import { Race } from "../../../global";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";

interface propTypes {
  race: Race;
  selectRace: React.Dispatch<React.SetStateAction<Race | undefined>>;
  displayOnly?: boolean;
  onClick: CallableFunction;
}

export const RaceCard = ({
  onClick,
  race,
  selectRace,
  displayOnly,
}: propTypes) => {
  return (
    <Card
      sx={{ border: "2px solid blue", margin: 1 }}
      onClick={(e) => onClick(e)}
    >
      <CardActionArea
        onClick={
          displayOnly
            ? undefined
            : () => {
                console.log("Selecting " + race.raceName);
                selectRace(race);
              }
        }
      >
        <CardContent>
          <Typography variant="h6">{race.raceName}</Typography>
          <Typography>
            {race.season} Round {race.round}
          </Typography>
          <Typography sx={{ fontWeight: "10" }}>{race.date}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Results
        </Button>
        <Button size="small" color="primary">
          Standings
        </Button>
      </CardActions>
    </Card>
  );
};
