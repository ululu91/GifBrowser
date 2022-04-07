import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'k81anJsVwSpOSJJQpU82id4P3k6YaMuZ';

  // todo cambiar any por sus tipos
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient ) { }

  buscarGifs(query: string) {
  
    query = query.trim().toLowerCase();
   
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=k81anJsVwSpOSJJQpU82id4P3k6YaMuZ&q=${query}&limit=10`)
      .subscribe( (resp: any ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }

}
