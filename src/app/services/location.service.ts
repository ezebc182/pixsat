import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {WtISSResponse} from '../interfaces/wtissat.interface';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) {
    }

    getCurrentPosition(): Observable<WtISSResponse> {
        const ISS_ID = environment.wheretheissat.issID;
        return this.http.get(`${environment.wheretheissat.endpoint}/${ISS_ID}`)
            .pipe(map((response: WtISSResponse) => response));
    }

    track(): Observable<WtISSResponse> {
        const ISS_ID = environment.wheretheissat.issID;
        const iss$ = this.http.get(`${environment.wheretheissat.endpoint}/${ISS_ID}`);
        const trigger$ = timer(0, 5000);
        return trigger$.pipe(
            concatMap(_ => iss$),
            map((response: WtISSResponse) => response)
        );
    }

    getCityFromLocation(location: WtISSResponse) {
        const key = `key=${environment.google.key}`;
        const lang = 'language=en';
        const latLng = `latlng=${location.latitude},${location.longitude}`; // 'latlng=31.230416,121.473701'; //
        const resultType = 'result_type=political|country|administrative_area_level_1|locality|natural_feature';
        return this.http.get(`${environment.google.geocode.endpoint}?${latLng}&${resultType}&${lang}&${key}`)
            .pipe(map((response: any) => response));
    }

    getCitiesWithinDistance(searchTerm: string, location: any, distance?: number) {
        const radius = distance ? distance : 6000;
        const key = `key=${environment.google.key}`;
        const latLng = `${location.latitude},${location.longitude}`;
        const locationbias = `locationbias=circle:${radius}@${latLng}`;
        const input = `input=${searchTerm}&inputtype=textquery`;
        const fields = 'fields=formatted_address,name';
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        });
        return this.http.get(`${environment.google.place.endpoint}?${input}&${locationbias}&${fields}&${key}`, {headers})
            .pipe(map((response: any) => response));
    }
}
