export interface Circuit {
  circuitId: number;
  name: string;
  country: string;
  location: string;
  svg_url_suffix: string;
}

export type Circuits = Circuit[];

/**********************************************/

export interface Driver {
  driverId: number;
  number: number;
  code: string;
  name: string;
}

export type Drivers = Driver[];

/**********************************************/

export interface Race {
  raceId: number;
  circuitId: number;
  year: number;
  date: string;
  name: string;
}

/** lookup table; from circuitId to array of all races */
export type Races = { [key: string]: Race[] };

/**********************************************/

export interface Result {
  raceId: number;
  driverId: number;
  constructorName: string;
  color: string;
  position: string;
  points: number;
  year: number;
  circuitId: number;
}

/** lookup table; from `(driverId, circuitId)` to array of all results */
export type Results = { [key: string]: Result[] };

/**********************************************/

export interface Constructor {
  name: string;
}

/** lookup table; from constructorId to constructor */
export type Constructors = { [key: string]: Constructor };

/**********************************************/

/** lookup table; from `(driverId, raceId)` */
export type RawLapTimes = { [key: string]: { milliseconds: number[] } };

export type LapTimes = { [key: number]: number[] };
