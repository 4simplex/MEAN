import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';

import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';

import { PriceComponent } from './components/price/price.component';
import { PriceDetailComponent } from './components/price-detail/price-detail.component';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brand/:id', component: BrandDetailComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'providers', component: ProviderComponent },
  { path: 'providers/:id', component: ProviderDetailComponent },
  { path: 'price', component: PriceComponent },
  { path: 'price/:id', component: PriceDetailComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }