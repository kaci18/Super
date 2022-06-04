import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Game {
  name: String;
  score: Number;
}
@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private _endpoint = "http://localhost:8080/scores/tetris";
  constructor(private _http: HttpClient) {}
  load(): Observable<Game[]> {
    const headers = new HttpHeaders({ "Accept": "application/json" });
    return this._http.get<Game[]>(this._endpoint, {headers} );
  }
}