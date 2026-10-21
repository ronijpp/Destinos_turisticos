import { TestBed } from '@angular/core/testing';
import { OpenTripMap } from './open-trip-map';

describe('OpenTripMap', () => {
  let service: OpenTripMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTripMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
