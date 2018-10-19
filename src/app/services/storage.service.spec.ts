import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {Satellite} from '../models/satellite.class';

fdescribe('StorageService', () => {
    let service: StorageService;
    let storage: Storage;
    let key: string;
    let storedData: Satellite | object;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StorageService]
        });
        service = TestBed.get(StorageService);
    });

    beforeEach(() => {
        key = 'TEST_KEY';
        storage = localStorage;
        storedData = {
            key: 'KEY',
            value: 'VALUE'
        };
    });

    afterEach(() => {
        storage.removeItem(key);
        key = null;
        storedData = {};
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set a key to storage', () => {
        service.set(key, storedData, storage);
        expect(storage.getItem(key)).toEqual(JSON.stringify((storedData)));
    });

    it('should get an object previously stored', (done) => {
        service.set(key, storedData, storage);
        service.get(key, storage).then((data: Satellite | object) => {
            expect(data).toEqual(storedData);
            done();
        });
    });

    it('should delete a key previously stored', () => {
        service.set(key, storedData, storage);
        service.delete(key, storage);
        expect(storage.getItem(key)).toBeNull();
    });

    it('should check existence if an object was stored or not', () => {
        service.set(key, storedData, storage);
        expect(service.exists(key, storage)).toBe(true);
    });
});
