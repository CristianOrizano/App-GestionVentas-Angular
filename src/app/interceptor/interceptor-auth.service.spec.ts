import { TestBed } from '@angular/core/testing';

import { InterceptorAuthService } from './interceptor-auth.service';

describe('InterceptorAuthService', () => {
  let service: InterceptorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
