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

@NgModule({
  declarations: [
    AppComponent,
    RacquetsComponent,
    ApparelComponent,
    ShoesComponent,
    RacquetDetailComponent,
    ShoeDetailComponent,
    ApparelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
