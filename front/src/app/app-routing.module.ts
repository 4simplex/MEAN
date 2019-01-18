import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';

import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';

import { StockComponent } from './components/stock/stock.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brand/:id', component: BrandDetailComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'providers', component: ProviderComponent },
  { path: 'stock', component: StockComponent },
  { path: 'stock/:id', component: StockDetailComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }