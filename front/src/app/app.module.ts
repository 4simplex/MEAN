import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandService } from './services/brand.service';
import { BrandComponent } from './components/brand/brand.component';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService} from './services/category.service';
import { HttpClientModule} from '@angular/common/http';
import { ProviderComponent } from './components/provider/provider.component';
import { ProviderService } from './services/provider.service';
import { StockComponent } from './components/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    ProviderComponent,
    StockComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [
    BrandService, 
    CategoryService, 
    ProviderService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
