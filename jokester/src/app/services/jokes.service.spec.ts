import { TestBed } from '@angular/core/testing';

import { JokesService } from './jokes.service';
import { HttpClientModule } from '@angular/common/http';

describe('JokeService', () => {
  let service: JokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(JokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
