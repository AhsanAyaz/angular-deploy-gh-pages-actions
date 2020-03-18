import { Component, OnInit } from '@angular/core';
import { JokesService } from './services/jokes.service';
import { IJokeRes } from './interfaces/joke-response.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jokes = [];
  isLoading = false;
  constructor(private jokesService: JokesService) {}
  ngOnInit() {
    this.getJokes();
  }

  getJokes() {
    this.isLoading = true;
    this.jokesService.getJoke()
      .subscribe((jokeResp: IJokeRes) => {
        this.isLoading = false;
        this.jokes[0] = jokeResp.joke;
      }, (err) => {
        this.isLoading = false;
        console.error(err);
      });
  }
}
