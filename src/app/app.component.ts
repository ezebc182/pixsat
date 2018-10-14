import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISSResponse, IssService} from './services/iss.service';
import {Observable, Subscription} from 'rxjs';
import {
    ControlPosition,
    StreetViewControlOptions,
    ZoomControlOptions,
    ZoomControlStyle
} from '../../node_modules/@agm/core/services/google-maps-types';
import {MatSnackBar} from '@angular/material';
import {flatMap, mergeMap} from 'rxjs/operators';


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
    subscriptionISS: Subscription;
    zoomControlOptions: ZoomControlOptions = {
        position: ControlPosition.RIGHT_CENTER,
        style: ZoomControlStyle.LARGE
    };
    streetViewControlOptions: StreetViewControlOptions = {
        position: ControlPosition.RIGHT_CENTER
    };
    tracking: boolean;
    currentCity: string;

    constructor(private iss: IssService, public snack: MatSnackBar) {
        this.satellite = {
            draggable: false,
            lat: 51.678418,
            lng: 7.809007,
            label: 'ISS'
        };
    }

    ngOnInit() {
        this.tracking = false;
        this.syncPosition();
    }

    ngOnDestroy() {
        if (this.subscriptionISS) {
            this.subscriptionISS.unsubscribe();
        }
    }

    syncPosition() {
        let message;
        this.iss.getCurrentPosition()
            .pipe(flatMap(result => this.iss.getCityFromLocation(result.iss_position)
            )).subscribe((response: any) => {
                console.log('eze', response);
            if (response.message === 'success') {
                this.lat = this.satellite.lat = parseFloat(response.iss_position.latitude);
                this.lng = this.satellite.lng = parseFloat(response.iss_position.longitude);
                message = 'ISS position updated successfully!';
            }
            this.showMessage(message);
        }, (e) => this.error(e));
    }


    toggleTracking() {
        this.tracking = !this.tracking;
        this.tracking ? this.startTracking() : this.stopTracking();
    }

    startTracking() {
        this.showMessage('Tracking ISS position ...');

        this.subscriptionISS = this.iss.track()
            .subscribe((response: ISSResponse) => {
                if (response.message === 'success') {
                    this.lat = this.satellite.lat = parseFloat(response.iss_position.latitude);
                    this.lng = this.satellite.lng = parseFloat(response.iss_position.longitude);
                }
            }, (e) => this.error(e));
    }

    stopTracking() {
        this.subscriptionISS.unsubscribe();
        this.satellite.lat = this.satellite.lng = null;
        this.showMessage('Stopping ISS  tracking position ...');
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
}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
