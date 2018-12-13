import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { ProductModel } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';

declare var M: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;

  

  constructor(private fb: FormBuilder, private productService: ProductService) {
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
    this.getAllProducts();
  }

  manageImgShow(){		
    this.uploadChild.showImgPrev();  
   }

  displayCounter(count) {
    this.productForm.get('fileImg').setValue(count);
  }

  addNewProduct(){
    
    //const uploadData = new FormData();
    //uploadData.append('name', this.productForm.get('name').value);
    //uploadData.append('file', this.productForm.get('file').value);
    
  
    this.productService.postProduct(this.productForm.value);
   //console.log(this.productForm.value)
   //this.productForm.get('photo').get('name').nativeElement.value = null;
    this.productForm.reset();
    this.manageImgShow();
    console.log(this.productForm)
 
   
    //console.log(this.productForm.value)
  }

  getAllProducts(){
    this.productService.getProduct()
    .subscribe(res => {
      this.productService.products = res as ProductModel[];
      this.getAllProducts();
    });;
  }

  deleteProduct(_id: string){
    if(confirm("Desea eliminar el producto?")){
      this.productService.deleteProduct(_id)
      .subscribe(res => {
        M.toast({html: 'Deleted successfuly'});
        this.getAllProducts();
      })
    }
  }

  editProduct(product){
    this.productService.selectedProduct = product;
  }
}
