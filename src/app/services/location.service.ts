import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WtISSResponse } from '../interfaces/wtissat-response.interface';
import { StorageService } from './storage.service';
import { UserPreferences } from '../models/user-preferences.class';
import storageSettings from '../misc/constants';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  userPreferences: UserPreferences;

  constructor (
    private http: HttpClient,
    private storageService: StorageService) {
    this.checkUserPreferences();
  }

  getCurrentPosition (): Observable<WtISSResponse> {
    this.checkUserPreferences();
    const ISS_ID = environment.wheretheissat.issID;
    const units = this.userPreferences && this.userPreferences.units || 'kilometers';
    const queryParams = `units=${units}`;
    return this.http.get(`${environment.wheretheissat.endpoint}/${ISS_ID}/?${queryParams}`)
      .pipe(map((response: WtISSResponse) => response));
  }

  track (): Observable<WtISSResponse> {
    this.checkUserPreferences();
    const units = this.userPreferences && this.userPreferences.units || 'kilometers';
    const ISS_ID = environment.wheretheissat.issID;
    const queryParams = `units=${units}`;
    const iss$ = this.http.get(`${environment.wheretheissat.endpoint}/${ISS_ID}/?${queryParams}`);
    const trigger$ = timer(0, 5000);
    return trigger$.pipe(
      concatMap(_ => iss$),
      map((response: WtISSResponse) => response)
    );
  }

  getCityFromLocation (location: WtISSResponse) {
    this.checkUserPreferences();
    const language = this.userPreferences && this.userPreferences.language || 'en';
    const key = `key=${environment.google.key}`;
    const lang = `language=${language}`;
    const latLng = `latlng=${location.latitude},${location.longitude}`;
    const resultType = 'result_type=political|country|administrative_area_level_1|locality|natural_feature';
    return this.http.get(`${environment.google.geocode.endpoint}?${latLng}&${resultType}&${lang}&${key}`)
      .pipe(map((response: any) => response));
  }

  getCitiesWithinDistance (searchTerm: string, location: any, distance?: number) {
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

  private checkUserPreferences () {
    this.userPreferences = <UserPreferences>this.storageService.get(storageSettings.USER_KEY, localStorage);
  }
}
