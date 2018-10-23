import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DisplayResultsDialogComponent } from './display-results-dialog.component';
import { UcfirstPipe } from '../../pipes/ucfirst.pipe';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatProgressBar } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';
import pixabayMock from '../../../mocks/pixabay.mock';
import { By } from '@angular/platform-browser';

describe('DisplayResultsComponent', () => {
  let component: DisplayResultsDialogComponent;
  let fixture: ComponentFixture<DisplayResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
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
      declarations: [DisplayResultsDialogComponent, UcfirstPipe, SafePipe],
      providers: [
        UcfirstPipe,
        SafePipe,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayResultsDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      location: 'tokyo',
      resources: pixabayMock.photos.hits,
      type: 'photos'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleDE = fixture.debugElement.query(By.directive(MatDialogTitle));
    expect(titleDE).toBeTruthy();
    expect(titleDE.nativeElement.textContent.trim())
      .toContain(component.data.type.toUpperCase() + ' - ' + component.data.location);
  });

  it('should render close button', () => {
    const buttonCloseDE = fixture.debugElement.query(By.css('.btn_close'));
    const buttonCloseAttributes = Object.keys(buttonCloseDE.attributes);
    expect(buttonCloseDE).toBeTruthy();
    expect(buttonCloseDE.nativeElement.textContent.trim()).toEqual('ACTION__CLOSE');
    expect(buttonCloseAttributes).toContain('mat-dialog-close');
    expect(buttonCloseAttributes).toContain('mat-button');
  });

  it('should render a loading indicator while resources are not ready', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(MatProgressBar))).toBeTruthy();
  });

  it('should render photos', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.display_dialog_results_photos'))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(MatProgressBar))).toBeFalsy();
    expect(fixture.debugElement.queryAll(By.css('.photos')).length).toEqual(component.data.resources.length);
  });

});
