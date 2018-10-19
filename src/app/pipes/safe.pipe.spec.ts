import {SafePipe} from './safe.pipe';
import {DomSanitizer} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';

describe('SafePipe', () => {
    let pipe: SafePipe;
    let domSanitizer: DomSanitizer;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [SafePipe]
        });
        domSanitizer = TestBed.get(DomSanitizer);
    });

    it('create an instance', () => {
        pipe = new SafePipe(domSanitizer);
        expect(pipe).toBeTruthy();
    });
});
