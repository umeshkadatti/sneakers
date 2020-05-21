import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { FooterComponent } from './footer/footer.component';
import { ShoesListComponent } from './shop/shoes-list/shoes-list.component';
import { ShoesEditComponent } from './shop/shoes-edit/shoes-edit.component';
import { ShoesDetailComponent } from './shop/shoes-detail/shoes-detail.component';
import { ShoeItemComponent } from './shop/shoes-list/shoe-item/shoe-item.component';
import { GenderFilterPipe } from './pipes/gender-filter.pipe';
import { ShoeResolver } from './shop/shoes-list/shoe-resolver.service';
import { HoverImageDirective } from './shop/shoes-list/hover.image.directive';
import { CartComponent } from './shop/cart/cart.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ViewCartComponent } from './shop/view-cart/view-cart.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { OrderSummaryComponent } from './shop/view-cart/order-summary/order-summary.component';
import { ItemsComponent } from './shop/items/items.component';
// import { ProdDetailResolver } from './shop/shoes-detail/prod-detail.resolver';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent, canActivate : [AuthGuard],
    children: [
      {path: 'cart', component: CartComponent},
      {path: 'view-cart', component: ViewCartComponent},
      {path: 'items', component: ItemsComponent, children: [
        { path: 'new', component: ShoesEditComponent },
        { path: ':id/edit', component: ShoesEditComponent } 
      ]},
      {path: ':cat', component: ShoesListComponent, resolve: {type : ShoeResolver }},
      {path: ':cat/:prodid', component: ShoesDetailComponent }
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
 ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShopComponent,
    FooterComponent,
    ShoesListComponent,
    ShoesEditComponent,
    ShoesDetailComponent,
    ShoeItemComponent,
    GenderFilterPipe,
    HoverImageDirective,
    CartComponent,
    PageNotFoundComponent,
    ViewCartComponent,
    AuthComponent,
    OrderSummaryComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [ShoeResolver, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
