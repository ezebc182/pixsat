import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { UserPreferences } from '../models/user-preferences.class';
import storageSettings from '../misc/constants';

@Injectable({
  providedIn: 'root'
})
export class PixabayService {
  userPreferences: UserPreferences;
  langParam: string;
  perPageParam: number;

  constructor (public http: HttpClient, private storageService: StorageService) {
    this.checkPreferences();
  }

  getPhotos (query: string) {
    this.checkPreferences();
    const search = query.toLowerCase();
    const queryParams = `q=${search}&per_page=${this.perPageParam}&lang=${this.langParam}&safesearch=true&image_type=photo`;

    return this.http.get(
      `${environment.pixabay.endpoint}?key=${environment.pixabay.key}&${queryParams}`)
      .pipe(map(response => response));
  }

  getVideos (query: string) {
    this.checkPreferences();
    const search = query.toLowerCase();
    const queryParams = `q=${search}&per_page=${this.perPageParam}&lang=${this.langParam}&safesearch=true`;

    return this.http.get(
      `${environment.pixabay.endpoint}videos/?key=${environment.pixabay.key}&${queryParams}`)
      .pipe(map(response => response));
  }

  private checkPreferences () {
    this.userPreferences = <UserPreferences>this.storageService.get(storageSettings.USER_KEY, storageSettings.STORAGE);
    if (this.userPreferences && this.userPreferences.language && this.userPreferences.resultsQuantity) {
      this.langParam = this.userPreferences.language || 'en';
      this.perPageParam = this.userPreferences.resultsQuantity || 15;
    }

  }
}
