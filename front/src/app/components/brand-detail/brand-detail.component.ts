import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  @Input() brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.brandService.getBrand(id)
      .subscribe(b => this.brand = b);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const name = this.brand.name;

    if (name.trim() === '') {
      alert('Dato no válido. Debe escribir una marca');
      return;
    }

    const nameWithOneSpace = RemoveWhiteSpaces(name);
    this.brand.name = nameWithOneSpace;

    const localId = this.route.snapshot.paramMap.get('id');

    this.brandService.getBrandByName(nameWithOneSpace, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.brandService.updateBrand(this.brand)
              .subscribe(() => this.goBack());
          } else {
            alert('El producto ya existe');
          }
        }

        if (res == null) {
          this.brandService.updateBrand(this.brand)
            .subscribe(() => this.goBack());
        }
      });
  }
}
