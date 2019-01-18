import { Component, OnInit } from '@angular/core';

import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[];
  actualPage: Number = 1;

  constructor(private brandService: BrandService, private productService: ProductService) { }

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
    this.productService.brandHasProducts(brand._id)
      .subscribe(res => {
        if (res !== null) {
          alert('No puede borrar la marca porque tiene productos existentes.');
        } else {
          if (confirm('Desea eliminar la marca?')) {
            this.brands = this.brands.filter(b => b !== brand);
            this.brandService.deleteBrand(brand).subscribe();
          }
        }
      });
  }

}
