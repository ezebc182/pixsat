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
        console.log('eze query', query);
        const search = query
            .toLowerCase(); // encodeURIComponent(query);
        return this.http.get(`${environment.PIXABAY.endpoint}?key=${environment.PIXABAY.key}&q=${search}&per_page=15&safesearch=true&image_type=picture`)
            .pipe(map(response => response));
    }

    getVideos(query: string) {
        const search = query
            .toLowerCase(); // encodeURIComponent(query);
        return this.http.get(`${environment.PIXABAY.endpoint}videos/?key=${environment.PIXABAY.key}&q=${search}&per_page=15&safesearch=true`)
            .pipe(map(response => response));
    }
}
