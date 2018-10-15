import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {environment} from './environment';
import {ISSResponse} from '../interfaces/iss.interface';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) {
    }

    getCurrentPosition(): Observable<ISSResponse> {
        return this.http.get(`${environment.ISS.endpoint}`)
            .pipe(map((response: ISSResponse) => response));
    }

    track(): Observable<ISSResponse> {
        const iss$ = this.http.get(`${environment.ISS.endpoint}`);
        const trigger$ = timer(0, 500);
        return trigger$.pipe(
            concatMap(_ => iss$),
            map((response: ISSResponse) => response)
        );
    }

    getCityFromLocation(location: any) {
        const key = `key=${environment.GOOGLE.KEY}`;
        const latLng = 'latlng=31.230416,121.473701'; //`latlng=${location.latitude},${location.longitude}`
        const resultType = 'result_type=political';
        return this.http.get(`${environment.GOOGLE.GEOCODE.endpoint}?${latLng}&${resultType}&${key}`)
            .pipe(map((response: any) => response));
    }

    getCitiesWithinDistance(searchTerm: string, location: any, distance?: number) {
        const radius = distance ? distance : 6000;
        const key = `key=${environment.GOOGLE.KEY}`;
        const latLng = `${location.latitude},${location.longitude}`;
        const locationbias = `locationbias=circle:${radius}@${latLng}`;
        const input = `input=${searchTerm}&inputtype=textquery`;
        const fields = 'fields=formatted_address,name';
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        });
        return this.http.get(`${environment.GOOGLE.PLACE.endpoint}?${input}&${locationbias}&${fields}&${key}`, {headers})
            .pipe(map((response: any) => response));
    }
}
