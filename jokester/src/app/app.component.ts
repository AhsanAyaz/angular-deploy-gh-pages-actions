import { Component, inject, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IJokeRes } from './interfaces/joke-response.interface';
import { JokesService } from './services/jokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jokes: string[] = [];
  isLoading = false;
  jokesService = inject(JokesService);
  ngOnInit() {
    this.getJokes();
  }

  getJokes() {
    this.isLoading = true;
    this.jokesService.getJoke()
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          console.error(err);
          return throwError(() => err)
        })
      )
      .subscribe((jokeResp: IJokeRes) => {
        this.isLoading = false;
        this.jokes[0] = jokeResp.joke;
      });
  }
}
