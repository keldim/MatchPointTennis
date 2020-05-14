import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { RacquetDetailComponent } from './racquets/racquet-detail/racquet-detail.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { ApparelDetailComponent } from './apparel/apparel-detail/apparel-detail.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ApparelMenComponent } from './apparel/apparel-men/apparel-men.component';
import { ApparelWomenComponent } from './apparel/apparel-women/apparel-women.component';
import { ShoesMenComponent } from './shoes/shoes-men/shoes-men.component';
import { ShoesWomenComponent } from './shoes/shoes-women/shoes-women.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { OtherItemsComponent } from './other-items/other-items.component';
import { OtherItemsDetailComponent } from './other-items/other-items-detail/other-items-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RacquetsComponent,
    RacquetDetailComponent,
    ShoeDetailComponent,
    ApparelDetailComponent,
    HomeComponent,
    CartComponent,
    ApparelMenComponent,
    ApparelWomenComponent,
    ShoesMenComponent,
    ShoesWomenComponent,
    OtherItemsComponent,
    OtherItemsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    NgxImageZoomModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
