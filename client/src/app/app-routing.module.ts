import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { RacquetDetailComponent } from './racquets/racquet-detail/racquet-detail.component';
import { ApparelMenComponent } from './apparel/apparel-men/apparel-men.component';
import { ApparelDetailComponent } from './apparel/apparel-detail/apparel-detail.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { ShoesMenComponent } from './shoes/shoes-men/shoes-men.component';

const routes: Routes = [];


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'racquets', component: RacquetsComponent },
      { path: 'racquets/:id', component: RacquetDetailComponent },
      { path: 'apparel-men', component: ApparelMenComponent },
      { path: 'apparel-men/:id', component: ApparelDetailComponent },
      { path: 'shoe-men', component: ShoesMenComponent },
      { path: 'shoe-men/:id', component: ShoeDetailComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
