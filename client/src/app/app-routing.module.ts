import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ApparelComponent } from './apparel/apparel.component';

const routes: Routes = [];


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'racquets', component: RacquetsComponent },
      { path: 'shoes', component: ShoesComponent },
      { path: 'apparel', component: ApparelComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
