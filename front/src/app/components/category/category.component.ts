import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {CategoryModel} from '../../models/category-model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Categories = [];
  constructor(private categoryService: CategoryService) { }
  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategory()
    .subscribe(res => {
      this.Categories = res as CategoryModel[];
    });
  }

  addNewCategory(form: NgForm) {
    this.categoryService.postCategory(form.value)
    .subscribe(res => {
      console.log(res);
      this.getAllCategories();
    });
  }

}
