import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { BrandModel } from '../../models/brand-model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  Brands = [];
  constructor(private BrandService: BrandService) { }
  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands() {
    this.BrandService.getBrand()
    .subscribe(res => {
      this.Brands = res as BrandModel[];
    });
  }

  addNewBrand(form: NgForm) {
    this.BrandService.postBrand(form.value)
    .subscribe(res => {
      console.log(res);
      this.getAllBrands();
    });
  }

}