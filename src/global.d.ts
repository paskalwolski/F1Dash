export interface Season {
  season: string;
  url: string;
  Races: Race[];
  season?: string;
}

export interface Race {
  Circuit: Circuit;
  Qualifying: Session;
  FirstPractice: Session;
  SecondPractice: Session;
  ThirdPractice?: Session;
  raceName: string;
  round: string;
  season: string;
  date: string;
  time: string;
  url: string;
}

export interface RaceTable {
  season: string;
  Races: Race[];
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: {
    millis: string;
    time: string;
  };
  FastestLap: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Session {
  date: string;
  time: string;
}

export enum RaceInformationTabs {
  details = "Details",
  results = "Results",
  standings = "Standings",
}
