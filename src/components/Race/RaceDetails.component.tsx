import { useContext, useEffect } from "react";
import { RaceContext } from "../../contexts/ContextProvider";

export const RaceDetails = () => {
  const RaceCTX = useContext(RaceContext);

  const selectedRace = RaceCTX?.state.selectedRace;

  return <Box></Box>;
};
