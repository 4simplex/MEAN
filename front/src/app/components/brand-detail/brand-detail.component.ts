import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Brand } from '../../models/brand-model';
import { BrandService }  from '../../services/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: [ './brand-detail.component.css' ]
})
export class BrandDetailComponent implements OnInit {
  @Input() brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private location: Location
  ) {}

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
    this.brandService.updateBrand(this.brand)
      .subscribe(() => this.goBack());
  }
}