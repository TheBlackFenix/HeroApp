import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canActivatePublic, canMatchGuard, canMatchPublic } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule),
    canActivate:[canActivatePublic],
    canMatch:[canMatchPublic]
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(heroes => heroes.HeroesModule),
    canActivate:[canActivateGuard],
    canMatch:[canMatchGuard]
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch:'full'
  },
  {
    path:'**',
    component: Error404PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
