

export type Beacon = {
  id: string,
  metrics: string
};

let beacons: Beacon[] = [];

export const addBeacon = (b: Beacon) => {
  beacons.push(b);
}