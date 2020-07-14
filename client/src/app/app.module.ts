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
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { OtherItemsComponent } from './other-items/other-items.component';
import { OtherItemsDetailComponent } from './other-items/other-items-detail/other-items-detail.component';
import { DeleteModalComponent } from './cart/delete-modal/delete-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { ReviewAndOrderComponent } from './review-and-order/review-and-order.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ApparelComponent } from './apparel/apparel.component';

@NgModule({
  declarations: [
    AppComponent,
    RacquetsComponent,
    RacquetDetailComponent,
    ShoeDetailComponent,
    ApparelDetailComponent,
    HomeComponent,
    CartComponent,
    ApparelComponent,
    ShoesComponent,
    OtherItemsComponent,
    OtherItemsDetailComponent,
    DeleteModalComponent,
    ShippingAndPaymentComponent,
    ReviewAndOrderComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    NgxImageZoomModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
