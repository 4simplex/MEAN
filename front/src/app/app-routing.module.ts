import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';
import { StockComponent } from './components/stock/stock.component';
import { PriceComponent } from './components/price/price.component';
import { PriceDetailComponent } from './components/price-detail/price-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { SaleComponent } from './components/sale/sale.component';
import { StatsComponent } from './components/stats/stats.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'brand/:id', component: BrandDetailComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'providers', component: ProviderComponent, canActivate: [AuthGuard] },
  { path: 'providers/:id', component: ProviderDetailComponent, canActivate: [AuthGuard] },
  { path: 'price', component: PriceComponent, canActivate: [AuthGuard] },
  { path: 'price/:id', component: PriceDetailComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
