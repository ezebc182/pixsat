import { Injector, Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../services/storage.service';
import storageSettings from '../misc/constants';
import { UserPreferences } from '../models/user-preferences.class';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  storageService: StorageService;
  userPreferences: UserPreferences;

  constructor (private injector: Injector) {
    this.storageService = this.injector.get(StorageService);
  }

  transform (value: any, args?: any): any {
    this.userPreferences = <UserPreferences>this.storageService.get(storageSettings.USER_KEY, storageSettings.STORAGE);
    let units = '';

    if (args && this.userPreferences) {
      units = `${args[0] === 'kilometers' ? 'km' : 'mi'}`;

      if (args[1] && args[1] === 'velocity') {
        units = units === 'km' ? 'kph' : 'mph';
      }
    }

    return `${value} ${units}`;

  }
}
