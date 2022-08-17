import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsComponent } from './menu/menu-items/menu-items.component';
import { MenuInfoComponent } from './menu/menu-info/menu-info.component';

import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { BilloutComponent } from './billout/billout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    MenuItemsComponent,
    MenuInfoComponent,
    CartComponent,
    OrderStatusComponent,
    BilloutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
