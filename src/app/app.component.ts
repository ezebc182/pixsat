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
import {Marker} from './interfaces/marker.interface';
import {DisplayResultsComponent} from './components/display-results/display-results.component';
import {delay} from 'rxjs/operators';
import {WtISSResponse} from './interfaces/wtissat.interface';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'My first AGM project';
    lat = 51.678418;
    lng = 7.809007;
    satellite: Marker;
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
        private locationService: LocationService,
        private pixabayService: PixabayService,
        public snack: MatSnackBar,
        public dialog: MatDialog) {
        this.satellite = {
            draggable: false,
            lat: 51.678418,
            lng: 7.809007,
            label: 'ISS'
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
        this.locationService.getCurrentPosition().subscribe((response: WtISSResponse) => {
            if (response) {
                this.updateLocation(response);
                this.showMessage('iss position updated successfully!');
            }
        }, (e) => this.error(e));
    }

    toggleTracking() {
        this.tracking = !this.tracking;
        this.tracking ? this.startTracking() : this.stopTracking();
    }

    startTracking() {
        this.showMessage('Tracking iss position ...');

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
        const dialogRef = this.dialog.open(DisplayResultsComponent, {
            width: '600px',
            data: {
                location: this.currentCity,
                resources: sources.hits,
                type: this.selection
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    private updateLocation(response: WtISSResponse) {
        if (response) {
            this.lat = this.satellite.lat = response.latitude;
            this.lng = this.satellite.lng = response.longitude;
            this.locationService.getCityFromLocation(response).subscribe((data) => {
                if (data && data.status !== 'ZERO_RESULTS') {
                    this.currentCity = this.transformDataToCity(data);
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

