import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin-products/add-product/add-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UpdateProductComponent } from './admin-products/update-product/update-product.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminProductsComponent,
  //  canActivate:[AuthGuard],
    children: [
      { path: '', component: AdminProductsComponent },
      //   { path: 'delete:prId', component: DeleteProductComponent },
    ]
  },
  { path: 'admin/update/:prId', component: UpdateProductComponent },
  { path: 'admin/create', component: AddProductComponent },
  { path: 'products',component: ProductsComponent, pathMatch:'full'},
  { path: 'products/:categoryId',component: ProductsComponent, pathMatch:'full'},
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }