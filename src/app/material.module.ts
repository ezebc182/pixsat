import {NgModule} from '@angular/core';
import {
	MatCheckboxModule,
	MatButtonModule,
	MatInputModule,
	MatAutocompleteModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatRadioModule,
	MatSelectModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatMenuModule,
	MatSidenavModule,
	MatToolbarModule,
	MatListModule,
	MatGridListModule,
	MatCardModule,
	MatStepperModule,
	MatTabsModule,
	MatExpansionModule,
	MatButtonToggleModule,
	MatChipsModule,
	MatIconModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatDialogModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule
} from '@angular/material';


const MAT_MODULES = [
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
];
@NgModule({
    imports: MAT_MODULES,
    exports: MAT_MODULES,
    declarations: []
})
export class MaterialModule {}
