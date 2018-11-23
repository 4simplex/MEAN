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
import { StockService } from './services/stock.service';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    ProviderComponent,
    StockComponent,
    NavigationComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
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
