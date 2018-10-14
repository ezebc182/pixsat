import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {IssService} from './services/iss.service';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {environment} from './services/environment';
import {PixabayService} from './services/pixabay.service';


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
    declarations: [AppComponent],
    providers: [IssService, PixabayService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
