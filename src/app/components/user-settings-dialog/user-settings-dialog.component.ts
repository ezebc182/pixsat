import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserPreferences} from '../../models/user-preferences.class';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-settings-dialog',
    templateUrl: './user-settings-dialog.component.html',
    styleUrls: ['./user-settings-dialog.component.css']
})
export class UserSettingsDialogComponent implements OnInit {
    settings: UserPreferences;

    constructor(
        public translate: TranslateService,
        public dialogRef: MatDialogRef<UserSettingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserPreferences) {
    }

    ngOnInit() {
        if (this.data) {
            this.settings = this.data;
        }
    }

    saveSettings() {
        this.dialogRef.close(this.settings);
    }
}
