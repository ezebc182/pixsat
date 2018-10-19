import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PixabayService {

    constructor(public http: HttpClient) {
    }

    getPhotos(query: string) {
        const search = query.toLowerCase();
        return this.http.get(
            `${environment.pixabay.endpoint}?key=${environment.pixabay.key}&q=${search}&per_page=15&safesearch=true&image_type=photo`)
            .pipe(map(response => response));
    }

    getVideos(query: string) {
        const search = query.toLowerCase();
        return this.http.get(
            `${environment.pixabay.endpoint}videos/?key=${environment.pixabay.key}&q=${search}&per_page=15&safesearch=true`)
            .pipe(map(response => response));
    }
}
