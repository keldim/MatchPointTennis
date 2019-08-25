import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { ApparelComponent } from './apparel/apparel.component';
import { ShoesComponent } from './shoes/shoes.component';
import { RacquetDetailComponent } from './racquets/racquet-detail/racquet-detail.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { ApparelDetailComponent } from './apparel/apparel-detail/apparel-detail.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    RacquetsComponent,
    ApparelComponent,
    ShoesComponent,
    RacquetDetailComponent,
    ShoeDetailComponent,
    ApparelDetailComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
