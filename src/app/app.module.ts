import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './categories/categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { NavbarComponent } from './products/navbar/navbar.component';
import { CartListComponent } from './products/cart-list/cart-list.component';
import { NavbarAdminComponent } from './admin-products/navbar-admin/navbar-admin.component';
import { AddProductComponent } from './admin-products/add-product/add-product.component';
import { UpdateProductComponent } from './admin-products/update-product/update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoryComponent,
    AdminProductsComponent,
    NavbarComponent,
    CartListComponent,
    NavbarAdminComponent,
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,HttpClientModule ,AppRoutingModule,FormsModule ,ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
