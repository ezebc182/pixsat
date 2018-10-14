import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {environment} from './environment';

export interface ISSResponse {
    iss_position: {
        latitude: string,
        longitude: string
    };
    timestamp: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class IssService {

    constructor(private http: HttpClient) {
    }

    getCurrentPosition() {
        return this.http.get('http://api.open-notify.org/iss-now.json')
            .pipe(map((response: ISSResponse) => response));
    }

    track(): Observable<ISSResponse> {
        const iss$ = this.http.get('http://api.open-notify.org/iss-now.json');
        const trigger$ = timer(0, 500);
        return trigger$.pipe(
            concatMap(_ => iss$),
            map((response: ISSResponse) => response)
        );
    }

    getCityFromLocation(location: any) {
        console.log(location);
        return this.http.get(`${environment.GOOGLE.GEOCODE.endpoint}json?latlng=${location.latitude},${location.longitude}&key=${environment.GOOGLE.KEY}`)
            .pipe(map((response: any) => response));
    }
}
