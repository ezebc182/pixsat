import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {
    ControlPosition,
    StreetViewControlOptions,
    ZoomControlOptions,
    ZoomControlStyle
} from '../../node_modules/@agm/core/services/google-maps-types';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PixabayService} from './services/pixabay.service';
import {LocationService} from './services/location.service';
import {delay} from 'rxjs/operators';
import {StorageService} from './services/storage.service';
import {Satellite} from './models/satellite.class';
import {DisplayResultsDialogComponent} from './components/display-results-dialog/display-results-dialog.component';
import {WtISSResponse} from './interfaces/wtissat-response.interface';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsDialogComponent} from './components/user-settings-dialog/user-settings-dialog.component';
import {UserPreferences} from './models/user-preferences.class';

const POSITION_KEY = 'last_position';
const USER_KEY = 'user_settings';
const STORAGE = localStorage;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    lat: number;
    lng: number;
    satellite: Satellite;
    settings: UserPreferences;
    place: object;
    currentCity: string;
    subscriptionISS: Subscription;
    zoomControlOptions: ZoomControlOptions = {
        position: ControlPosition.RIGHT_CENTER,
        style: ZoomControlStyle.LARGE
    };
    streetViewControlOptions: StreetViewControlOptions = {
        position: ControlPosition.RIGHT_CENTER
    };
    tracking: boolean;

    constructor(
        private storageService: StorageService,
        private locationService: LocationService,
        private pixabayService: PixabayService,
        public snack: MatSnackBar,
        public dialog: MatDialog,
        public translate: TranslateService) {

        this.checkUserPreferences();
    }

    ngOnInit() {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.lat = 0;
        this.lng = 0;
        this.satellite = {
            lat: 0,
            lng: 0,
            altitude: 0,
            velocity: 0
        };
    }

    ngOnDestroy() {
        if (this.subscriptionISS) {
            this.subscriptionISS.unsubscribe();
        }
    }

    syncPosition() {
        if (this.storageService.exists(POSITION_KEY, STORAGE)) {
            this.storageService.get(POSITION_KEY, STORAGE).then((lastKnownPosition: Satellite) => {
                this.lat = lastKnownPosition.lat;
                this.lng = lastKnownPosition.lng;
                this.satellite = {
                    ...this.satellite,
                    lat: lastKnownPosition.lat,
                    lng: lastKnownPosition.lng,
                    altitude: lastKnownPosition.altitude,
                    velocity: lastKnownPosition.velocity
                };
            });
        }

        this.locationService.getCurrentPosition().subscribe((response: WtISSResponse) => {
                if (response) {
                    this.updateLocation(response);
                }
            }, (e) => this.error(e),
            () =>
                this.showMessage(this.translate.instant('MESSAGE__POSITION_UPDATED')));
    }

    toggleTracking() {
        this.tracking = !this.tracking;
        this.tracking ? this.startTracking() : this.stopTracking();
    }

    startTracking() {
        this.showMessage(this.translate.instant('MESSAGE__STARTING_TRACK'));
        this.subscriptionISS = this.locationService.track()
            .subscribe((response: WtISSResponse) => {
                this.updateLocation(response);
            }, (e) => this.error(e));
    }

    stopTracking() {
        this.subscriptionISS.unsubscribe();
        this.satellite.lat = this.satellite.lng = null;
        this.showMessage(this.translate.instant('MESSAGE__STOPPING_TRACK'));
    }

    getResources() {
        let requestType = 'getPhotos';
        let action = null;
        let results = 'MESSAGE__ZERO_RESULTS';
        if (this.settings.resourceType && this.settings.resourceType !== 'photos') {
            requestType = 'getVideos';
        }

        this.translate.get('MESSAGE__SEARCHING',
            {
                'selection': this.translate.instant(this.settings.resourceType.toUpperCase()),
                'currentCity': this.currentCity
            })
            .subscribe((translation) => {
                of(this.showMessage(translation))
                    .pipe(delay(1500)).subscribe(() => {
                    this.pixabayService[requestType](this.slugify(this.currentCity)).subscribe((resources) => {
                        if (resources && resources.totalHits > 0) {
                            action = this.translate.instant('ACTION__OPEN_RESULTS');
                            results = this.translate.instant('MESSAGE__RESULTS_FOUND');
                        }
                        const snackRef = this.snack.open(results, action);
                        snackRef.onAction().subscribe(() => this.openDialog(resources));
                    });
                });
            });


    }

    openSettings() {
        this.dialog.open(UserSettingsDialogComponent, {
            width: '500px',
            data: this.settings || {}
        }).afterClosed().subscribe((userPreferences: UserPreferences) => {
            if (userPreferences) {
                this.storageService.set(USER_KEY, userPreferences, STORAGE);
                this.init(userPreferences);
            }
        });
    }

    openDialog(sources): void {
        this.dialog.open(DisplayResultsDialogComponent, {
            width: '800px',
            data: {
                location: this.currentCity,
                resources: sources.hits,
                type: this.settings.resourceType
            }
        });
    }

    private updateLocation(response: WtISSResponse) {
        if (response) {
            this.satellite = {
                ...this.satellite,
                lat: response.latitude,
                lng: response.longitude,
                altitude: response.altitude,
                velocity: response.velocity
            };
            this.storageService.set(POSITION_KEY, this.satellite, STORAGE);
            this.lat = response.latitude;
            this.lng = response.longitude;
            this.locationService.getCityFromLocation(response).subscribe((data) => {
                if (data && data.status !== 'ZERO_RESULTS') {
                    this.currentCity = this.transformDataToCity(data);
                    this.place = {place: this.currentCity ? this.currentCity : ''};
                    this.satellite = {
                        ...this.satellite,
                        currentPlace: this.currentCity
                    };
                    this.storageService.set(POSITION_KEY, this.satellite, STORAGE);
                }
            }, (e) => this.error(e));
        }
    }

    private showMessage(message: string) {
        this.snack.open(message, null, {
            duration: 3000
        });
    }

    private error(e ?) {
        if (e) {
            this.showMessage(this.translate.instant('ERROR__GENERIC'));
        }
    }

    private transformDataToCity(data) {
        let result = '';
        if (data && data.results && data.results[2]) {
            result = data.results[2]
                .formatted_address.split(',')[0]
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        return result;
    }

    private slugify(text) {
        return text.toString()
            .replace(/[^\w\-]+/g, ' ')
            .replace(/\s+/g, '+');
    }

    private checkUserPreferences() {
        let dialogUserRef = null;
        this.storageService.get(USER_KEY, localStorage)
            .then((data: UserPreferences) => {
                if (data) {
                    this.init(data);
                }
            }).catch(() => {
            dialogUserRef = this.openSettings();
        });


        this.syncPosition();
    }

    private init(data: UserPreferences) {
        this.translate.use(data.language);
        this.settings = {
            ...this.settings,
            trackOnInit: data.trackOnInit,
            resourceType: data.resourceType,
            resultsQuantity: data.resultsQuantity,
            language: data.language
        };
        if (data.trackOnInit) {
            this.toggleTracking();
        }
    }
}

