import { Injectable } from '@angular/core';
import { Satellite } from '../models/satellite.class';
import { UserPreferences } from '../models/user-preferences.class';
import * as _ from 'lodash';
import storageSettings from '../../app/misc/constants';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor () {
    const KEYS = [storageSettings.POSITION_KEY, storageSettings.USER_KEY];
    KEYS.map((key) => {
      if (this.exists(key, storageSettings.STORAGE) && this.isCorrupted(key, storageSettings.STORAGE)) {
        this.delete(key, storageSettings.STORAGE);
      }
    });
  }

  set (key: string, data: object, storage: Storage): void {
    const place = (<Satellite> data);
    if (key === storageSettings.POSITION_KEY && place.currentPlace && place.currentPlace.toLowerCase() !== undefined) {
      this.storePlace(place);
    }
    storage.setItem(key, JSON.stringify(data));
  }

  exists (key: string, storage: Storage): boolean {
    return !!storage.getItem(key);
  }

  get (key: string, storage: Storage): Satellite | UserPreferences | null | Array<Satellite> {
    return storage.getItem(key) ? JSON.parse(storage.getItem(key)) : null;
  }

  delete (key: string, storage: Storage): void | null {
    return storage.getItem(key) ? storage.removeItem(key) : null;
  }

  private storePlace (data: Satellite) {
    let places = [];
    if (this.exists(storageSettings.FLOWN_PLACES_KEY, storageSettings.STORAGE)) {
      const storedPlaces = <Array<Satellite>>this.get(storageSettings.FLOWN_PLACES_KEY, storageSettings.STORAGE);
      if (storedPlaces.length === 10) {
        storedPlaces.unshift();
      }

      if (!_.includes(_.map(storedPlaces, 'currentPlace'), data.currentPlace)) {
        storedPlaces.push(data);
      }
      places = _.assign(places, storedPlaces);
    } else {
      places.push(data);
    }

    this.set(storageSettings.FLOWN_PLACES_KEY, places, storageSettings.STORAGE);
  }

  private isCorrupted (key: string, storage: Storage) {
    let helperClass = null;
    const storedData = Object.keys(this.get(key, storage));
    if (key === storageSettings.USER_KEY) {
      helperClass = new UserPreferences('en', 'photos', 15, false, 'kilometers');
    } else if (key === storageSettings.POSITION_KEY) {
      helperClass = new Satellite(30, 20, 100, 200);
    }
    return !!_.difference(Object.getOwnPropertyNames(helperClass).sort(), storedData.sort()).length;
  }
}
