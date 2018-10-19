import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PixalResource} from '../../interfaces/pixal-resource.interface';

@Component({
    selector: 'app-display-results-dialog',
    templateUrl: './display-results-dialog.component.html',
    styleUrls: ['./display-results-dialog.component.css']
})
export class DisplayResultsDialogComponent {

    @Input() resources: Array<any>;

    constructor(
        public dialogRef: MatDialogRef<DisplayResultsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PixalResource) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
