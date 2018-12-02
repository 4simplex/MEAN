import { Component, OnInit } from '@angular/core';

import { Brand } from '../../models/brand-model';
import { BrandService }  from '../../services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[];

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands()
    .subscribe(bs => this.brands = bs);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.brandService.addBrand({ name } as Brand)
      .subscribe(brand => {
        this.brands.push(brand);
      });
  }

  delete(brand: Brand): void {
    this.brands = this.brands.filter(b => b !== brand);
    this.brandService.deleteBrand(brand).subscribe();
  }

}