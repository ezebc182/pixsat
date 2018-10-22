import { Injectable } from '@angular/core';
import { Satellite } from '../models/satellite.class';
import { UserPreferences } from '../models/user-preferences.class';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor () {
  }

  set (key: string, data: object, storage: Storage): void {
    storage.setItem(key, JSON.stringify(data));
  }

  exists (key: string, storage: Storage): boolean {
    return !!storage.getItem(key);
  }

  get (key: string, storage: Storage): Satellite | UserPreferences | null {
    return storage.getItem(key) ? JSON.parse(storage.getItem(key)) : null;
  }

  delete (key: string, storage: Storage): void | null {
    return storage.getItem(key) ? storage.removeItem(key) : null;
  }
}
