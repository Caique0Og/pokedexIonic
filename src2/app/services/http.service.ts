import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(url?: string): Observable<PokemonListResponse> {
    const apiUrl = url || `${this.apiUrl}?limit=20`;
    return this.http.get<PokemonListResponse>(apiUrl);
  }

  // Novo método para buscar detalhes de um Pokémon específico
  getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
