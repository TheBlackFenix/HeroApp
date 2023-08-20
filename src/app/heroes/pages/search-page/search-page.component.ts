import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  constructor(
    private heroesService: HeroesService
    ){}

  public selectedHero? : Hero;
  public searchInput = new FormControl('');
  public heroes : Hero[] =[]

  searchHero(){
    const value : string = this.searchInput.value || '';
    this.heroesService.getSugestions(value)
    .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event : MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectedHero = undefined;
      return
    }
    const hero : Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }

}
