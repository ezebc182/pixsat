export class Satellite {
  lat: number;
  lng: number;
  velocity: number;
  altitude: number;
  label?: string;
  draggable?: boolean;
  currentPlace?: string;

  constructor (
    lat: number,
    lng: number,
    velocity: number,
    altitude: number) {
    this.velocity = velocity;
    this.altitude = altitude;
    this.lat = lat;
    this.lng = lng;
  }

}
