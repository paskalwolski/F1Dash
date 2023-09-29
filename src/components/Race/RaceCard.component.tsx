import { Race } from "../../global";
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
  // selectRace: React.Dispatch<React.SetStateAction<Race | undefined>>;
  displayOnly?: boolean;
  actionAreaClick?: CallableFunction;
  resultButtonClickAction?: CallableFunction;
  standingsButtonClickAction?: CallableFunction;
}

export const RaceCard = ({
  race,
  // selectRace,
  displayOnly,
  actionAreaClick,
  resultButtonClickAction,
  standingsButtonClickAction,
}: propTypes) => {
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
                actionAreaClick && actionAreaClick();
                console.log("Selecting " + race.raceName);
                // selectRace(race);
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
          {resultButtonClickAction && (
            <Button size="small" color="primary">
              Results
            </Button>
          )}
          {standingsButtonClickAction && (
            <Button
              size="small"
              color="primary"
              onClick={standingsButtonClickAction()}
            >
              Standings
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};
