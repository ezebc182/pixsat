import { UnitPipe } from './unit.pipe';
import { StorageService } from '../services/storage.service';
import { TestBed } from '@angular/core/testing';
import storageSettings from '../misc/constants';

describe('UnitPipe', () => {
  let pipe: UnitPipe;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [UnitPipe, StorageService]
    });
    pipe = TestBed.get(UnitPipe);
  });

  afterAll(() => {
    pipe.storageService.delete(storageSettings.USER_KEY, storageSettings.STORAGE);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return distance in metric system', () => {
    pipe.storageService.set(storageSettings.USER_KEY, {
      language: 'en',
      units: 'kilometers',
      trackOnInit: false,
      resourceType: 'photos',
      resultsQuantity: 15
    }, storageSettings.STORAGE);
    const dataToTransform = {
      value: 500,
      units: 'kilometers'
    };
    expect(pipe.transform(dataToTransform.value, [dataToTransform.units]))
      .toEqual(`${dataToTransform.value} km`);
    expect(pipe.transform(dataToTransform.value, [dataToTransform.units, 'velocity']))
      .toEqual(`${dataToTransform.value} kph`);
  });

  it('should return distance in imperial system', () => {
    pipe.storageService.set(storageSettings.USER_KEY, {
      language: 'en',
      units: 'miles',
      trackOnInit: false,
      resourceType: 'photos',
      resultsQuantity: 15
    }, storageSettings.STORAGE);
    const dataToTransform = {
      value: 500,
      units: 'miles'
    };
    expect(pipe.transform(dataToTransform.value, [dataToTransform.units]))
      .toEqual(`${dataToTransform.value} mi`);
    expect(pipe.transform(dataToTransform.value, [dataToTransform.units, 'velocity']))
      .toEqual(`${dataToTransform.value} mph`);
  });
});
