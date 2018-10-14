import { TestBed, inject } from '@angular/core/testing';

import { IssService } from './iss.service';

describe('IssService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssService]
    });
  });

  it('should be created', inject([IssService], (service: IssService) => {
    expect(service).toBeTruthy();
  }));
});
