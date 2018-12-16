import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { ProductModel } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
    this.productForm = fb.group({
      'name': ['', Validators.required],
      'category': fb.group({
        'name': ['']
      }),
      'brand': fb.group({
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
    const test = this.route.snapshot.paramMap.get('id');
    console.log(test);
  }


}
