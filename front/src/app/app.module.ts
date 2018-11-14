import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrandService } from './services/brand.service';

import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
