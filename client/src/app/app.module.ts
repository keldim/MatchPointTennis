import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { ApparelComponent } from './apparel/apparel.component';
import { ShoesComponent } from './shoes/shoes.component';

@NgModule({
  declarations: [
    AppComponent,
    RacquetsComponent,
    ApparelComponent,
    ShoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
