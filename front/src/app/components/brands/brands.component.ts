import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { appLiterals } from '../../resources/appLiterals';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[];
  selectedBrand: Brand;
  actualPage: Number = 1;
  appLiterals;

  constructor(private brandService: BrandService, private productService: ProductService) {
    this.selectedBrand = new Brand();
    this.appLiterals = appLiterals();
  }

  ngOnInit() {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands()
      .subscribe(bs => this.brands = bs);
  }

  addBrand(brandForm: NgForm): void {
    if (brandForm.controls.name.value.trim() === '') {
      alert(this.appLiterals.brands.invalidMsg);
      return;
    }
    let name = brandForm.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.brandService.getBrandByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('La Marca ya existe');
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.brandService.addBrand({ name } as Brand)
            .subscribe(brand => {
              this.brands.push(brand);
              this.selectedBrand.name = '';
              this.selectedBrand._id = '';
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
