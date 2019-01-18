import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from './services/brand.service';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { BrandSelectorComponent } from './components/brand-selector/brand-selector.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ProviderService } from './services/provider.service';
import { StockComponent } from './components/stock/stock.component';
import { StockService } from './services/stock.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProviderSelectorComponent } from './components/provider-selector/provider-selector.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    CategorySelectorComponent,
    BrandSelectorComponent,
    UploadImageComponent,
    ProviderComponent,
    StockComponent,
    NavigationComponent,
    ProviderSelectorComponent,
    BrandsComponent,
    BrandDetailComponent,
    ProductDetailComponent,
    ProductSelectorComponent,
    StockDetailComponent
    CategoryDetailComponent,
    ProviderDetailComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],

  providers: [
    BrandService,
    CategoryService,
    ProviderService,
    StockService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
