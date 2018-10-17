export class Satellite {
    lat: number;
    lng: number;
    velocity: number;
    altitude: number;
    label?: string;
    draggable?: boolean;
    currentPlace?: string;

    constructor() {
        this.label = 'ISS';
        this.currentPlace = '';
        this.draggable = false;
    }

}
