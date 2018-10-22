import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserPreferences } from '../../models/user-preferences.class';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.css']
})
export class UserSettingsDialogComponent implements OnInit {
  settingsForm: FormGroup;

  constructor (
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<UserSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPreferences) {
  }

  ngOnInit () {
    this.settingsForm = this.createSettingsForm();
  }

  private createSettingsForm () {
    return this.formBuilder.group({
      'units': [this.data && this.data.units || 'kilometers', Validators.required],
      'language': [this.data && this.data.language || 'en', Validators.required],
      'results': [this.data && this.data.resultsQuantity || 3,
        [Validators.required, Validators.min(3), Validators.max(200)]],
      'resource': [this.data && this.data.resourceType || 'photos', [Validators.required]],
      'trackOnInit': [this.data && this.data.trackOnInit || false, [Validators.required]]
    });
  }

  saveSettings () {
    const settings = new UserPreferences();
    settings.trackOnInit = this.settingsForm.controls.trackOnInit.value;
    settings.language = this.settingsForm.controls.language.value;
    settings.resultsQuantity = this.settingsForm.controls.results.value;
    settings.resourceType = this.settingsForm.controls.resource.value;
    settings.units = this.settingsForm.controls.units.value;

    this.dialogRef.close(settings);
  }
}
