import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(private authService: AuthService,
      private router : Router
    ){}

  onLogin(email:string = 'BlackFenix', password:string = "VlackFenix"):void{
    this.authService.logIn(email,password).subscribe(user =>{
      this.router.navigate(['/heroes'])
    })
  }
}
