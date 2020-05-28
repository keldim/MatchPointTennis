import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { RacquetDetailComponent } from './racquets/racquet-detail/racquet-detail.component';
import { ApparelMenComponent } from './apparel/apparel-men/apparel-men.component';
import { ApparelDetailComponent } from './apparel/apparel-detail/apparel-detail.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { ShoesMenComponent } from './shoes/shoes-men/shoes-men.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { OtherItemsDetailComponent } from './other-items/other-items-detail/other-items-detail.component';
import { CartComponent } from './cart/cart.component';
import { ShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { ReviewAndOrderComponent } from './review-and-order/review-and-order.component';

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
      { path: 'items', component: OtherItemsComponent },
      { path: 'items/:id', component: OtherItemsDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping-and-payment', component: ShippingAndPaymentComponent },
      { path: 'review-and-order', component: ReviewAndOrderComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
