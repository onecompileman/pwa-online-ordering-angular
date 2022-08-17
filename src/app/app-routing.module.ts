import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BilloutComponent } from './billout/billout.component';
import { CartComponent } from './cart/cart.component';
import { MenuItemsResolver } from './core/resolvers/menu-items.resolver';
import { HomeComponent } from './home/home.component';
import { MenuInfoComponent } from './menu/menu-info/menu-info.component';
import { MenuItemsComponent } from './menu/menu-items/menu-items.component';
import { MenuComponent } from './menu/menu.component';
import { OrderStatusComponent } from './order-status/order-status.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'menu',
    pathMatch: 'full',
    component: MenuComponent,
    resolve: {
      menu: MenuItemsResolver,
    },
  },
  {
    path: 'menu/:type',
    component: MenuItemsComponent,
    resolve: {
      menu: MenuItemsResolver,
    },
  },

  {
    path: 'menu-info/:id',
    component: MenuInfoComponent,
    resolve: {
      menu: MenuItemsResolver,
    },
  },

  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      menu: MenuItemsResolver,
    },
  },

  {
    path: 'order-status',
    component: OrderStatusComponent,
    resolve: {
      menu: MenuItemsResolver,
    },
  },

  {
    path: 'bill-out',
    component: BilloutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
