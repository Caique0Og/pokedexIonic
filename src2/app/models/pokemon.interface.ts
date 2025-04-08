// pokemon.interface.ts
export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }