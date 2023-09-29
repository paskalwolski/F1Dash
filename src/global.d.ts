export type Season = {
  season: string;
  url: string;
  Races: Race[];
  season?: string;
};

export type Race = {
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
};

export type RaceTable = {
  season: string;
  Races: Race[];
};

export type Circuit = {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
};

export type Result = {
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
};

export type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type Session = {
  date: string;
  time: string;
};
