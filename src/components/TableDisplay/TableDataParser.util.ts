export const fetchDataByType = <T>(
  dataType: RawResultTypes,
  data: RawResultData[]
): T[] => {
  switch (dataType) {
    case "Results":
      return getResultTableData(data as RaceResult[]) as T[];
    case "Sprint":
      return getSprintResultTable(data as SprintResult[]) as T[];
    case "Qualifying":
      return getQualiResultTable(data as QualifyingResult[]) as T[];
    case "ConstructorStandings":
      return getConstructorStandingTable(data as ConstructorStanding[]) as T[];
    case "DriverStandings":
      return getDriverStandingTable(data as DriverStanding[]) as T[];
  }
};

export const getResultTableData = (data: RaceResult[]) => {
  const tableDataContainer = data.map((res: RaceResult) => {
    return {
      position: Number(res.position),
      number: Number(res.number),
      points: Number(res.points),
      Driver: res.Driver.givenName + " " + res.Driver.familyName,
      Constructor: res.Constructor.name,
      grid: Number(res.grid),
      laps: Number(res.laps),
      status: res.status,
      isFastestLap: res.FastestLap?.rank == "1" ? true : false,
      fastestLapRank: Number(res.FastestLap?.rank),
      fastestLapNumber: Number(res.FastestLap?.lap),
      fastestLapTime: res.FastestLap?.Time.time,
      AverageSpeed: Number(res.FastestLap?.AverageSpeed.speed),
    };
  });
  return tableDataContainer;
};

export const getQualiResultTable = (data: QualifyingResult[]) => {
  const tableDataContainer = data.map((res) => {
    return {
      number: Number(res.number),
      position: Number(res.position),
      Driver: res.Driver.code,
      Constructor: res.Constructor.name,
      Q1: res.Q1,
      Q2: res.Q2,
      Q3: res.Q3,
    };
  });
  return tableDataContainer;
};

export const getSprintResultTable = (data: SprintResult[]) => {
  const tableDataContainer = data.map((res) => {
    return {
      position: Number(res.position),
      number: Number(res.number),
      points: Number(res.points),
      Driver: res.Driver.code,
      Constructor: res.Constructor.name,
      grid: Number(res.grid),
      laps: Number(res.laps),
      status: res.status,
      fastestLapNumber: Number(res.FastestLap?.lap),
      fastestLapTime: res.FastestLap?.Time.time,
    };
  });
  return tableDataContainer;
};

export const getConstructorStandingTable = (data: ConstructorStanding[]) => {
  const tableDataContainer = data.map((res) => {
    return {
      position: Number(res.position),
      positionText: res.positionText,
      points: Number(res.points),
      wins: Number(res.wins),
      Constructor: res.Constructor.name,
    };
  });
  return tableDataContainer;
};

export const getDriverStandingTable = (data: DriverStanding[]) => {
  const tableDataContainer = data.map((res) => {
    return {
      position: Number(res.position),
      positionText: res.positionText,
      Driver: res.Driver.code,
      points: Number(res.points),
      wins: Number(res.wins),
      Constructor: res.Constructors[0].name,
    };
  });
  return tableDataContainer;
};
