// import { Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Grid } from "@mui/material";
import { RaceCard } from "./RaceCard.component";
import { RaceDisplay } from "./RaceDisplay.component";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceContextTypes } from "../../contexts/context.types";
import { CarLoader } from "../CarLoader/CarLoader";

export const RaceSelectionPanel = () => {
  const raceContext: RaceContextTypes | null = useContext(RaceContext);


  const selectedRace = useMemo(
    () => raceContext?.state.selectedRace,
    [raceContext?.state.selectedRace]
  );

  const seasonRaceTable = useMemo(
    () => raceContext?.state.seasonRaceTable,
    [raceContext?.state.seasonRaceTable]
  );

  const PureRaceDisplay = React.memo(RaceDisplay);

  return raceContext?.state.raceTableLoading ? (
    <CarLoader />
  ) : (
    raceContext && (
      <Grid
        container
        height={"100%"}
        padding="0px"
        paddingTop="8px"
        paddingLeft="8px"
      >
        <Grid md={10} xs={12} item>
          {selectedRace ? (
            <PureRaceDisplay {...{ race: selectedRace }} />
          ) : (
            <div>Please select a race</div>
          )}
        </Grid>
        <Grid
          md={2}
          container
          item
          spacing={1}
          overflow={"scroll"}
          height={"100%"}
          padding={"0px"}
          paddingLeft="8px"
          paddingRight="8px"
        >
          {seasonRaceTable &&
            seasonRaceTable.Races.map((race, i) => (
              <Grid item width={"100%"} key={i}>
                <RaceCard
                  dispatchRaceContext={raceContext?.dispatch}
                  key={i}
                  {...{ race }}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    )
  );
};
