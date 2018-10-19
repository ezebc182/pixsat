import {inject, TestBed} from '@angular/core/testing';
import {LocationService} from './location.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {WtISSResponse} from '../interfaces/wtissat-response.interface';

fdescribe('LocationService', () => {
    let httpMock: HttpTestingController;
    let service: LocationService;
    let issPosition: WtISSResponse;

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
        issPosition = {
            'name': 'iss',
            'id': 25544,
            'latitude': -31.366479,
            'longitude': -64.246906,
            'altitude': 413.49147571615,
            'velocity': 27605.598615202,
            'visibility': 'daylight',
            'footprint': 4474.2016679512,
            'timestamp': 1539914227,
            'daynum': 2458410.581331,
            'solar_lat': -9.9109347555021,
            'solar_lon': 146.98886653019,
            'units': 'kilometers'
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

        const request = httpMock.expectOne(`${environment.wheretheissat.endpoint}/${issID}`);
        expect(request.request.method).toBe('GET');
        request.flush(issPosition);
    });

    it('should get a known place based on ISS position', () => {
        const key = `key=${environment.google.key}`;
        const lang = 'language=en';
        const latLng = `latlng=${issPosition.latitude},${issPosition.longitude}`;
        const resultType = 'result_type=political|country|administrative_area_level_1|locality|natural_feature';
        const results = [
            {
                'address_components': [
                    {
                        'long_name': 'Córdoba',
                        'short_name': 'Córdoba',
                        'types': [
                            'locality',
                            'political'
                        ]
                    },
                    {
                        'long_name': 'Capital Department',
                        'short_name': 'Capital Department',
                        'types': [
                            'administrative_area_level_2',
                            'political'
                        ]
                    },
                    {
                        'long_name': 'Cordoba',
                        'short_name': 'Cordoba',
                        'types': [
                            'administrative_area_level_1',
                            'political'
                        ]
                    },
                    {
                        'long_name': 'Argentina',
                        'short_name': 'AR',
                        'types': [
                            'country',
                            'political'
                        ]
                    }
                ],
                'formatted_address': 'Córdoba, Cordoba, Argentina',
                'geometry': {
                    'bounds': {
                        'northeast': {
                            'lat': -31.3063946,
                            'lng': -64.06909929999999
                        },
                        'southwest': {
                            'lat': -31.4924454,
                            'lng': -64.3195887
                        }
                    },
                    'location': {
                        'lat': -31.42008329999999,
                        'lng': -64.1887761
                    },
                    'location_type': 'APPROXIMATE',
                    'viewport': {
                        'northeast': {
                            'lat': -31.3063946,
                            'lng': -64.06909929999999
                        },
                        'southwest': {
                            'lat': -31.4924454,
                            'lng': -64.3195887
                        }
                    }
                },
                'place_id': 'ChIJaVuPR1-YMpQRkrBmU5pPorA',
                'types': [
                    'locality',
                    'political'
                ]
            }
        ];
        service.getCityFromLocation(issPosition).subscribe((place: any) => {
            expect(typeof place).toBe('object');
        });

        const request = httpMock.expectOne(`${environment.google.geocode.endpoint}?${latLng}&${resultType}&${lang}&${key}`);
        expect(request.request.method).toBe('GET');
        request.flush(results);
    });
});
