import { Component, OnInit } from '@angular/core';

import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

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

    //const name = this.productForm.get('name').value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.brandService.getBrandByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('El producto ya existe');
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.brandService.addBrand({ name } as Brand)
            .subscribe(brand => {
              this.brands.push(brand);
            });
        }
      });
  }

  delete(brand: Brand): void {
    this.brands = this.brands.filter(b => b !== brand);
    this.brandService.deleteBrand(brand).subscribe();
  }

}