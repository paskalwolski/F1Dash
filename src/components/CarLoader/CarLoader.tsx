import { Box, Typography } from "@mui/material";
import f1 from "../../assets/f1.svg";

import "./CarLoader.styles.css";

export const CarLoader = () => {
  return (
    <Box className={"loader-window"}>
      <div className="track">
        <img
          style={{ width: "100px", height: "100px" }}
          src={f1}
          className="car"
        />
      </div>
      <Typography variant={"caption"} fontSize={"6px"} className="attribution">
        Evgeni Moryakov // The Noun Project
      </Typography>
    </Box>
  );
};
