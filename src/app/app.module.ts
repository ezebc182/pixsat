import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {environment} from './services/environment';
import {PixabayService} from './services/pixabay.service';
import {LocationService} from './services/location.service';
import {DisplayResultsComponent} from './components/display-results/display-results.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE.KEY
        })
    ],
    declarations: [AppComponent, DisplayResultsComponent],
    providers: [LocationService, PixabayService],
    entryComponents: [DisplayResultsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
