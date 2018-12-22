import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { getNoImage } from '../../../assets/noimage';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;

  noImage = getNoImage();

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = fb.group({
      'name': ['', Validators.required],
      'category': fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'brand': fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'photo': fb.group({
        'name': ['']
      }),
      'fileImg': [''],
      'description': ['']
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  manageImgShow() {
    this.uploadChild.showImgPrev();
  }

  displayCounter(count) {
    this.productForm.get('fileImg').setValue(count);
  }

  addNewProduct() {
    this.productService.postProduct(this.productForm.value)
      .subscribe(res => {
        this.productForm.reset();
        this.manageImgShow();
        this.getAllProducts();
      });
  }

  getAllProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.productService.products = res as Product[];
      });
  }

  deleteProduct(_id: string) {
    if (confirm('Desea eliminar el producto?')) {
      this.productService.deleteProduct(_id)
        .subscribe(res => {
          this.getAllProducts();
        });
    }
  }

  editProduct(product) {
    this.productService.selectedProduct = product;
  }
}
