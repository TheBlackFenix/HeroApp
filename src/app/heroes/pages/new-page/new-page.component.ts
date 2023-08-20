import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pipe, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {
  
  constructor(private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
    private snackBar : MatSnackBar,
    private dialog: MatDialog
    ){}

  get currentHero() : Hero{
    const hero = this.heroForm.value as Hero
    return hero
  }
  public publishers = [
    {id: 'DC Comics',value: 'DC - Comics'},
    {id: 'Marvel Comics',value: 'Marvel - Comics'}
  ]

  public heroForm = new FormGroup(
  {
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('',{ nonNullable:true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  })
  
  onSubmit():void{
    if(this.heroForm.invalid) return
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(
        hero => {
          this.showSnackBar(`Se a actualizado el superheroe ${hero.superhero}`)
        }
      )
      return
    }
    this.heroesService.addHero(this.currentHero)
      .subscribe(
        hero => {
          this.router.navigate(['/heroes/edit',hero.id]);
          this.showSnackBar(`Se a creado el superheroe ${hero.superhero}`)
        }
      )

  }


  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe( hero => {
      if(!hero) this.router.navigateByUrl('/')
      this.heroForm.reset(hero)
    }

    )
  }

  confirmDelete(){
    if(!this.currentHero.id) throw Error('Hero id is required');
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
       data: this.heroForm.value})
    
    dialogRef.afterClosed()
      .pipe(
        filter((result:boolean) => result),
        switchMap(()=> this.heroesService.deleteHero(this.currentHero.id)),
        filter((wasDeleted:boolean) => wasDeleted)
      )
      .subscribe(()=>{
        this.router.navigate(['/heroes/list'])
      })
    
    // dialogRef.afterClosed().subscribe(result =>{
    //   if(!result) return;
    //   this.heroesService.deleteHero(this.currentHero.id).subscribe(wasDeleted => {
    //     if(wasDeleted)
    //       this.router.navigate(['/heroes/list'])
    //   })
    // })
  }
  showSnackBar(message:string):void{
    this.snackBar.open(message,'done',{duration:2500})
  }


}
