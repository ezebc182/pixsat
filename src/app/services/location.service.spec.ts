import { TestBed, inject } from '@angular/core/testing';

import { ISSService } from './iss.service';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ISSService]
    });
  });

  it('should be created', inject([ISSService], (service: ISSService) => {
    expect(service).toBeTruthy();
  }));
});
