export type TableData =
  | RaceResultTableData
  | QualiResultTableData
  | SprintResultTableData
  | ConstructorStandingTableData
  | DriverStandingTableData
  | object;

export type RaceResultTableData = {
  number: number;
  position: number;
  points: number;
  Driver: string;
  Constructor: string;
  grid: number;
  laps: number;
  status: string;
  isFastestLap: boolean;
  fastestLapRank: number;
  fastestLapNumber: number;
  fastestLapTime: string;
  AverageSpeed: number;
};

export type QualiResultTableData = {
  number: number;
  position: number;
  Driver: string;
  Constructor: string;
  Q1: string;
  Q2: string;
  Q3: string;
};

export type SprintResultTableData = {
  position: number;
  number: number;
  points: number;
  Driver: string;
  Constructor: string;
  grid: number;
  laps: number;
  status: string;
};

export type ConstructorStandingTableData = {
  position: number;
  positionText: string;
  points: number;
  wins: number;
  Constructor: string;
};

export type DriverStandingTableData = ConstructorStandingTableData & {
  Driver: string;
};
