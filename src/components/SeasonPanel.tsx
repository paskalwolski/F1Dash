import React, { useState, useEffect } from "react";
import { Season } from "../global";

export const SeasonPanel = () => {
  const [seasons, setSeasons] = useState<Season[] | undefined>(undefined);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/seasons.json")
      .then((res) => res.json())
      .then((data) => {
        const seasonData = data?.["MRData"]?.["SeasonTable"];
        console.log(seasonData);
        setSeasons(seasonData);
      });
  }, []);

  return (
    <>
      <div>Pick your Season</div>
    </>
  );
};
