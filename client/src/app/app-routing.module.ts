import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacquetsComponent } from './racquets/racquets.component';
import { RacquetDetailComponent } from './racquets/racquet-detail/racquet-detail.component';
import { ApparelDetailComponent } from './apparel/apparel-detail/apparel-detail.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { OtherItemsDetailComponent } from './other-items/other-items-detail/other-items-detail.component';
import { CartComponent } from './cart/cart.component';
import { ShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { ReviewAndOrderComponent } from './review-and-order/review-and-order.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ApparelComponent } from './apparel/apparel.component';

const routes: Routes = [];


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'racquets', component: RacquetsComponent },
      { path: 'racquets/:id', component: RacquetDetailComponent },
      { path: 'apparel-men', component: ApparelComponent },
      { path: 'apparel-men/:id', component: ApparelDetailComponent },
      { path: 'apparel-women', component: ApparelComponent },
      { path: 'apparel-women/:id', component: ApparelDetailComponent },
      { path: 'shoe-men', component: ShoesComponent },
      { path: 'shoe-men/:id', component: ShoeDetailComponent },
      { path: 'shoe-women', component: ShoesComponent },
      { path: 'shoe-women/:id', component: ShoeDetailComponent },
      { path: 'items', component: OtherItemsComponent },
      { path: 'items/:id', component: OtherItemsDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping-and-payment', component: ShippingAndPaymentComponent },
      { path: 'review-and-order', component: ReviewAndOrderComponent },
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: 'new-user', component: UserRegistrationComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
