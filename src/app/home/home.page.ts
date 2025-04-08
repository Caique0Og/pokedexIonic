import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonicModule, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent
} from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { PokemonListResponse } from '../models/pokemon.interface';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    
  ]
})
export class HomePage implements OnInit {
  public pokemons: any[] = [];
  private nextUrl: string | null = null;
  private isLoading = false;
  private httpService = inject(HttpService);

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(url?: string) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.httpService.getPokemons(url).subscribe({
      next: (data: PokemonListResponse) => {
        this.pokemons = [...this.pokemons, ...data.results];
        this.nextUrl = data.next;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pokémons:', err);
        this.isLoading = false;
      }
    });
  }

  loadMorePokemons(event: Event) {
    const infiniteEvent = event as InfiniteScrollCustomEvent;
    if (this.nextUrl) {
      this.loadPokemons(this.nextUrl);
    }
    infiniteEvent.target.complete();
  }

  getPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  showPokemonDetails(pokemonId: number) {
    this.navCtrl.navigateForward(`/details/${pokemonId}`);
  }
}
