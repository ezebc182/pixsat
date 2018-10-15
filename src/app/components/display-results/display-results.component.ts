import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PixalResource} from '../../interfaces/pixal-resource.interface';

@Component({
    selector: 'app-display-results',
    templateUrl: './display-results.component.html',
    styleUrls: ['./display-results.component.css']
})
export class DisplayResultsComponent {

    @Input() resources: Array<any>;

    constructor(
        public dialogRef: MatDialogRef<DisplayResultsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PixalResource) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
