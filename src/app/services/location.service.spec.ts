import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { WtISSResponse } from '../interfaces/wtissat-response.interface';
import iss from '../../mocks/wheretheissat.mock';
import geocodeResponse from '../../mocks/geocode.mock';
import { UserPreferences } from '../models/user-preferences.class';

describe('LocationService', () => {
  let httpMock: HttpTestingController;
  let service: LocationService;
  let issPosition: any;
  let userPreferences: UserPreferences;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [LocationService]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(LocationService);
  });

  beforeEach(() => {
    issPosition = iss;
    userPreferences = {
      language: 'en',
      resultsQuantity: 15,
      resourceType: 'photos',
      trackOnInit: false,
      units: 'kilometers'
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.track).toBeDefined();
    expect(service.getCurrentPosition).toBeDefined();
    expect(service.getCityFromLocation).toBeDefined();
  });

  it('should get current ISS position', () => {
    const issID = environment.wheretheissat.issID;

    service.getCurrentPosition().subscribe((pos: WtISSResponse) => {
      expect(typeof pos).toBe('object');
      expect(pos).toEqual(issPosition);
    });

    const request = httpMock.expectOne(`${environment.wheretheissat.endpoint}/${issID}/?units=${userPreferences.units}`);
    expect(request.request.method).toBe('GET');
    request.flush(issPosition);
  });

  it('should get a known place based on ISS position', () => {
    const key = `key=${environment.google.key}`;
    const lang = 'language=en';
    const latLng = `latlng=${issPosition.latitude},${issPosition.longitude}`;
    const resultType = 'result_type=political|country|administrative_area_level_1|locality|natural_feature';
    const results = geocodeResponse;
    service.getCityFromLocation(issPosition).subscribe((place: any) => {
      expect(typeof place).toBe('object');
      expect(place).toEqual(results);
    });

    const request = httpMock.expectOne(`${environment.google.geocode.endpoint}?${latLng}&${resultType}&${lang}&${key}`);
    expect(request.request.method).toBe('GET');
    request.flush(results);
  });
});
