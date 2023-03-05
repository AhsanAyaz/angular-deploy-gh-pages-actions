import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJokeRes } from '../interfaces/joke-response.interface';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  http = inject(HttpClient)
  getJoke(): Observable<IJokeRes> {
    return this.http.get<IJokeRes>('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      },
      responseType: 'json'
    });
  }
}
