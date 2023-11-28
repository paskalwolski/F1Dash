export {};
declare global {
  export type Season = {
    season: string;
    url: string;
    Races: Race[];
  };

  export type Race = {
    Circuit: Circuit;
    Qualifying: Session;
    FirstPractice: Session;
    SecondPractice: Session;
    ThirdPractice?: Session;
    Sprint?: Session;
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

  export type RaceResult = {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
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

  export type Constructor = {
    constructorId: string;
    url: string;
    nationality: string;
    name: string;
  };

  export type Session = {
    date: string;
    time: string;
  };

  type Standing = {
    position: string;
    positionText: string;
    points: string;
    wins: string;
  };

  export type DriverStanding = Standing & {
    Driver: Driver;
    Constructors: Constructor[];
  };
  export type ConstructorStanding = Standing & {
    Constructor: Constructor;
  };

  export type QualifyingResult = {
    number: string;
    position: string;
    Driver: Driver;
    Constructor: Constructor;
    Q1: string;
    Q2: string;
    Q3: string;
  };

  export type SprintResult = {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
    Time?: {
      millis: string;
      time: string;
    };
    FastestLap?: {
      lap: string;
      Time: {
        time: string;
      };
    };
  };

  export type ResultTypes = {
    Results?: RaceResult[];
    Qualifying?: QualifyingResult[];
    Sprint?: SprintResult[];
    ConstructorStandings?: ConstructorStanding[];
    DriverStandings?: DriverStanding[];
  };

  export type RawResultData =
    | RaceResult
    | QualifyingResult
    | SprintResult
    | ConstructorStanding
    | DriverStanding;
  export type RawResultTypes = keyof ResultTypes;

  export type RaceDataTypes = ResultTypes & { Details: Race };
}
