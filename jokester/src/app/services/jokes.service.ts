import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJokeRes } from '../interfaces/joke-response.interface';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  constructor(private http: HttpClient) {}

  getJoke(): Observable<IJokeRes> {
    return this.http.get<IJokeRes>('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      },
      responseType: 'json'
    });
  }
}
