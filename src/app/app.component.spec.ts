import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { SafePipe } from './pipes/safe.pipe';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from './app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DisplayResultsDialogComponent } from './components/display-results-dialog/display-results-dialog.component';
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StorageService } from './services/storage.service';
import { LocationService } from './services/location.service';
import { PixabayService } from './services/pixabay.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  class MockUserSettingsDialogComponent {}
	class MockDisplayResultsDialogComponent {}
	class MockStorageService {}
	class MockLocationService {}
	class MockPixabayService {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient, UcfirstPipe]
          }
        })
      ],
      providers: [
        SafePipe,
        UcfirstPipe,
        StorageService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        LocationService,
        PixabayService
      ],
      declarations: [
        AppComponent,
				UserSettingsDialogComponent,
				DisplayResultsDialogComponent,
				UcfirstPipe,
        SafePipe
      ]
    });
	}));


	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
