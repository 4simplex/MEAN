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
import { PriceComponent } from './components/price/price.component';
import { PriceService } from './services/price.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProviderSelectorComponent } from './components/provider-selector/provider-selector.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { PriceDetailComponent } from './components/price-detail/price-detail.component';
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
    PriceComponent,
    NavigationComponent,
    ProviderSelectorComponent,
    BrandsComponent,
    BrandDetailComponent,
    ProductDetailComponent,
    ProductSelectorComponent,
    PriceDetailComponent,
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
    PriceService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
