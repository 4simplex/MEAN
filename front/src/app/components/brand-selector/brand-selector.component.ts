import { Component, OnInit, Input } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.css']
})
export class BrandSelectorComponent implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;

  constructor(private httpBrand: BrandService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.httpBrand.getBrands()
      .subscribe(res => {
        this.httpBrand.brands = res as Brand[];
      });
  }

}
