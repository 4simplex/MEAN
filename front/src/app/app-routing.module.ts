import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';

import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';
import { StockComponent } from './components/stock/stock.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brand/:id', component: BrandDetailComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'providers', component: ProviderComponent },
  { path: 'stock', component: StockComponent },
  { path: 'products', component: ProductComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}