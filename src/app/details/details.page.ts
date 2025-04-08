import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Importe o CommonModule
    IonicModule   // Importe o IonicModule
  ],
})
export class DetailsPage implements OnInit {
  pokemonId!: number;
  pokemonDetails: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.pokemonId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.httpService.getPokemonDetails(this.pokemonId).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
      },
      error: (err) => console.error(err),
    });
  }

  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
