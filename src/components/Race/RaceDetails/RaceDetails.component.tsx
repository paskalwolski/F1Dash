// import { useContext } from "react";
// import { RaceContext } from "../../contexts/ContextProvider";
import { Box, Typography } from "@mui/material";
import { Race } from "../../../types/global";

type Props = {
  // raceDetails: {
  //   date: string;
  //   time: string;
  //   Qualifying: Session;
  //   FirstPractice: Session;
  //   SecondPractice: Session;
  //   ThirdPractice?: Session;
  //   Sprint?: Session;
  // };
  race: Race;
};

export const RaceDetails = ({ race }: Props) => {
  // const RaceCTX = useContext(RaceContext);
  // const race = RaceCTX?.state.race;

  return (
    <Box>
      <Typography variant="body1">
        Race: {race.date + " at " + race.time}
      </Typography>
      <Typography variant="body1">
        Qualifying: {race.Qualifying.time}
      </Typography>
      <Typography variant="body2">
        First Practice: {race.FirstPractice.time}
      </Typography>
      <Typography variant="body2">
        {"Sprint" in race ? "Sprint Qualifying" : "Second Practice"}
        {": "}
        {race.SecondPractice.time}
      </Typography>
      {race.ThirdPractice && (
        <Typography variant="body2">
          Third Practice: {race.ThirdPractice.time}
        </Typography>
      )}
      {race.Sprint && (
        <Typography variant="body2">Sprint: {race.Sprint.time}</Typography>
      )}
    </Box>
  );
};
