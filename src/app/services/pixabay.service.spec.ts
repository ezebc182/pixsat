import {TestBed} from '@angular/core/testing';

import {PixabayService} from './pixabay.service';

describe('PixabayService', () => {
    let service: PixabayService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PixabayService]
        });
        service = TestBed.get(PixabayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
