import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand-model';

declare var M: any;

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.getBrands();
  }

  addBrand(form: NgForm){
    if(form.value._id){
      this.brandService.putBrand(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Updated successfuly'});
        this.getBrands();
      })
    }else{
      this.brandService.postBrand(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save successfuly'});
        this.getBrands();
      });
    }
  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe(res => {
        this.brandService.brands = res as Brand[];
        console.log(res);
      });
  }

  editBrand(brand: Brand){
    this.brandService.selectedBrand = brand;
  }

  deleteBrand(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.brandService.deleteBrand(_id)
        .subscribe(res => {
          M.toast({html: 'Deleted successfuly'});
          this.getBrands();
        });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.brandService.selectedBrand = new Brand();
    }
  }

}
