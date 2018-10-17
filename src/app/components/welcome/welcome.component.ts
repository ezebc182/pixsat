import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserPreferences} from '../../models/user-preferences.class';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<WelcomeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserPreferences) {
    }

    ngOnInit() {
    }

}
