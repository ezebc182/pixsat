import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PixabayService {

    constructor(public http: HttpClient) {
    }

    getPhotos(query: string) {
        return this.http.get(`${environment.PIXABAY.endpoint}?key=${environment.PIXABAY.key}&q=${query}`)
            .pipe(map(response => response));
    }

    getVideos(query: string) {
        return this.http.get(`${environment.PIXABAY.endpoint}videos/?key=${environment.PIXABAY.key}&q=${query}`)
            .pipe(map(response => response));
    }
}
