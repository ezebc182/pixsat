import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {PixabayService} from './services/pixabay.service';
import {LocationService} from './services/location.service';
import {SafePipe} from './pipes/safe.pipe';
import {StorageService} from './services/storage.service';
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';
import {DisplayResultsDialogComponent} from './components/display-results-dialog/display-results-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UcfirstPipe} from './pipes/ucfirst.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {SharedModule} from './shared.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AgmCoreModule.forRoot({
            apiKey: environment.google.key
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        SharedModule,
        MaterialModule,
    ],
    declarations: [AppComponent, DisplayResultsDialogComponent, UserSettingsDialogComponent, UcfirstPipe, SafePipe],
    providers: [LocationService, PixabayService, StorageService],
    entryComponents: [
      DisplayResultsDialogComponent,
      UserSettingsDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
