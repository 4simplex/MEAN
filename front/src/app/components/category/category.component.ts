import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category-model';

declare var M: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  addCategory(form: NgForm){
    if(form.value._id){
      this.categoryService.putCategory(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Updated successfuly'});
        this.getCategories();
      })
    }else{
      this.categoryService.postCategory(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save successfuly'});
        this.getCategories();
      });
    }
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe(res => {
        this.categoryService.categories = res as Category[];
        console.log(res);
      });
  }

  editCategory(category: Category){
    this.categoryService.selectedCategory = category;
  }

  deleteCategory(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.categoryService.deleteCategory(_id)
        .subscribe(res => {
          M.toast({html: 'Deleted successfuly'});
          this.getCategories();
        });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.categoryService.selectedCategory = new Category();
    }
  }

}
