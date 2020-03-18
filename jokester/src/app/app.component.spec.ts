import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { JokesService } from './services/jokes.service';

const DUMMY_JOKE = {
  id: '',
  joke: 'Hey dad, I am sorry. Hey sorry, I am dad!',
  status: 200
};

class JokesServiceMock {
  getJokes() {
    return of(DUMMY_JOKE);
  }
}

describe('AppComponent', () => {
  let jokesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: JokesServiceMock, useClass: JokesServiceMock
      }]
    }).compileComponents();
    jokesService = TestBed.inject(JokesService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have fetched the joke on app start`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getJokes');
    app.ngOnInit();
    expect(app.getJokes).toHaveBeenCalled();
  });

  it(`should have a joke in the jokes array after fetching on app start`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(jokesService, 'getJoke').and.returnValue(of(DUMMY_JOKE));
    app.ngOnInit();
    fixture.detectChanges();
    expect(jokesService.getJoke).toHaveBeenCalled();
    expect(app.jokes.length).toBe(1);
    expect(app.jokes[0]).toBe('Hey dad, I am sorry. Hey sorry, I am dad!');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Angular Deploy gh-pages Actions 🚀');
  });
});
