import { TestBed, inject } from '@angular/core/testing';

import { MpService } from './mp.service';

describe('MpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpService]
    });
  });

  it('should be created', inject([MpService], (service: MpService) => {
    expect(service).toBeTruthy();
  }));
});
