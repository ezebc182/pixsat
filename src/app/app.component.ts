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
import {DisplayResultsComponent} from './components/display-results/display-results.component';
import {delay} from 'rxjs/operators';
import {WtISSResponse} from './interfaces/wtissat.interface';
import {StorageService} from './services/storage.service';
import {Satellite} from './models/satellite.class';

const LOCAL_KEY = 'last_position';
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
    selection: string;
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
        public dialog: MatDialog) {
        this.lat = 0;
        this.lng = 0;
        this.satellite = {
            lat: 0,
            lng: 0,
            altitude: 0,
            velocity: 0
        };
    }

    ngOnInit() {
        this.selection = 'photos';
        this.tracking = false;
        this.syncPosition();
    }

    ngOnDestroy() {
        if (this.subscriptionISS) {
            this.subscriptionISS.unsubscribe();
        }
    }

    syncPosition() {
        if (this.storageService.exists(LOCAL_KEY, STORAGE)) {
            this.storageService.get(LOCAL_KEY, STORAGE).then(lastKnownPosition => {
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
                this.showMessage('ISS position updated successfully!'));
    }

    toggleTracking() {
        this.tracking = !this.tracking;
        this.tracking ? this.startTracking() : this.stopTracking();
    }

    startTracking() {
        this.showMessage('Tracking ISS position ...');
        this.subscriptionISS = this.locationService.track()
            .subscribe((response: WtISSResponse) => {
                this.updateLocation(response);
            }, (e) => this.error(e));
    }

    stopTracking() {
        this.subscriptionISS.unsubscribe();
        this.satellite.lat = this.satellite.lng = null;
        this.showMessage('Stopping iss  tracking position ...');
    }

    getResources() {
        let request = 'getPhotos';
        let action = null;
        let results = 'No results found';
        if (this.selection && this.selection !== 'photos') {
            request = 'getVideos';
        }
        of(this.showMessage(`Retrieving ${this.selection} from ${this.currentCity}`))
            .pipe(delay(1500)).subscribe(() => {
            this.pixabayService[request](this.currentCity).subscribe((resources) => {
                if (resources && resources.totalHits > 0) {
                    action = `Open to see ${this.selection}`;
                    results = 'Results found';
                }
                const snackRef = this.snack.open(results, action);
                snackRef.onAction().subscribe(() => this.openDialog(resources));
            });
        });
    }

    openDialog(sources): void {
        this.dialog.open(DisplayResultsComponent, {
            width: '600px',
            data: {
                location: this.currentCity,
                resources: sources.hits,
                type: this.selection
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
            this.storageService.set(LOCAL_KEY, this.satellite, STORAGE);
            this.lat = response.latitude;
            this.lng = response.longitude;
            this.locationService.getCityFromLocation(response).subscribe((data) => {
                if (data && data.status !== 'ZERO_RESULTS') {
                    this.currentCity = this.transformDataToCity(data);
                    this.satellite = {
                        ...this.satellite,
                        currentPlace: this.currentCity
                    };
                    this.storageService.set(LOCAL_KEY, this.satellite, STORAGE);
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
            this.showMessage('Something went wrong! Please try again.');
        }
    }

    private transformDataToCity(data) {
        let result = '';
        if (data && data.results && data.results[2]) {
            result = this.slugify(
                data.results[2]
                    .formatted_address.split(',')[0]
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        }
        return result;
    }

    private slugify(text) {
        return text.toString()
            .replace(/[^\w\-]+/g, ' ')
            .replace(/\s+/g, '+');
    }
}

