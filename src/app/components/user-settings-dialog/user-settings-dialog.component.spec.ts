import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { UserSettingsDialogComponent } from './user-settings-dialog.component';
import { UcfirstPipe } from 'src/app/pipes/ucfirst.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {
		 MatDialogRef,
		 MAT_DIALOG_DATA,
		 MatDialogTitle,
		 MatSelect,
		 MatCheckbox,
		 MatRadioGroup,
		 MatInput } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('UserSettingsDialogComponent', () => {
  let component: UserSettingsDialogComponent;
  let fixture: ComponentFixture<UserSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        schemas: [ NO_ERRORS_SCHEMA],
        imports: [
          BrowserAnimationsModule,
          MaterialModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient, UcfirstPipe]
            }
          })
        ],
      declarations: [UserSettingsDialogComponent, UcfirstPipe],
      providers: [
         UcfirstPipe,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsDialogComponent);
    component = fixture.componentInstance;
    component.settings = {
      language: 'en',
      resourceType: 'photos',
      resultsQuantity: 15,
      trackOnInit: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleDE = fixture.debugElement.query(By.directive(MatDialogTitle));
    expect(titleDE).toBeTruthy();
    expect(titleDE.nativeElement.textContent.trim()).toEqual('TITLE__USER_SETTINGS');
  });

  it('should render close button', () => {
    const buttonCloseDE = fixture.debugElement.query(By.css('.btn_close'));
    const buttonCloseAttributes = Object.keys(buttonCloseDE.attributes);
    expect(buttonCloseDE).toBeTruthy();
    expect(buttonCloseDE.nativeElement.textContent.trim()).toEqual('ACTION__CLOSE');
    expect(buttonCloseAttributes).toContain('mat-dialog-close');
    expect(buttonCloseAttributes).toContain('mat-button');
  });

  it('should render save button', () => {
    const buttonSaveDE = fixture.debugElement.query(By.css('.save'));
    const buttonSaveDEAttributes = Object.keys(buttonSaveDE.attributes);
    const buttonSaveDEListeners = buttonSaveDE.listeners;
    expect(buttonSaveDE).toBeTruthy();
    expect(buttonSaveDE.nativeElement.textContent.trim()).toEqual('ACTION__SAVE');
    expect(buttonSaveDEAttributes).toContain('mat-raised-button');
    buttonSaveDEListeners.forEach(listener => {
        expect(listener.name).toEqual('click');
    });
  });

  it('should render language select', () => {
		const sectionLanguageDE = fixture.debugElement.query(By.css('.language'));
		const selectLanguageDE = fixture.debugElement.query(By.directive(MatSelect));
		expect(sectionLanguageDE).toBeTruthy();
		expect(selectLanguageDE).toBeTruthy();
		expect(selectLanguageDE.children[0].nativeElement.textContent.trim()).toEqual('OPTION__SELECT_LANGUAGE');
		expect(selectLanguageDE.children[0].childNodes.length).toBe(2);
  });

  it('should render tracking checkbox', () => {
		const trackCheckboxDE = fixture.debugElement.query(By.directive(MatCheckbox));
		expect(fixture.debugElement.query(By.css('.tracking'))).toBeTruthy();
		expect(trackCheckboxDE).toBeTruthy();
		expect(trackCheckboxDE.nativeElement.textContent.trim()).toEqual('OPTION__AUTOPLAY_TRACKING?');
  });

  it('should render resource type radio buttons', () => {
		const resourceTypeRadioGroupDE = fixture.debugElement.query(By.directive(MatRadioGroup));
		expect(fixture.debugElement.query(By.css('.resource'))).toBeTruthy();
		expect(resourceTypeRadioGroupDE).toBeTruthy();
		expect(resourceTypeRadioGroupDE.children[0].nativeElement.textContent.trim()).toEqual('PHOTOS');
		expect(resourceTypeRadioGroupDE.children[1].nativeElement.textContent.trim()).toEqual('VIDEOS');
  });

  it('should render results quantity input', () => {
		const resultsPerPageInputDE = fixture.debugElement.query(By.directive(MatInput));
		expect(fixture.debugElement.query(By.css('.results'))).toBeTruthy();
		expect(resultsPerPageInputDE).toBeTruthy();
		expect(resultsPerPageInputDE.attributes.placeholder).toEqual('PLACEHOLDER__RESULTS_PER_PAGE');
  });
});

