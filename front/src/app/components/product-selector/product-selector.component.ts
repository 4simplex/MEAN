import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.css']
})
export class ProductSelectorComponent implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProduct()
      .subscribe(res => {
        this.productService.products = res as ProductModel[];
      })
  }

  onChange(productId) {
    console.log(productId);
  }

}
