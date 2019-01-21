import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;
  actualPage: Number = 1;
  constructor(private categoryService: CategoryService) {
    this.selectedCategory = new Category();
  }

  ngOnInit() {
    this.getCategories();
  }

  addCategory(categoryForm: NgForm) {
    let name = categoryForm.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.categoryService.getCategoryByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('El producto ya existe');
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.categoryService.postCategory({ name } as Category)
            .subscribe(category => {
              this.categories.push(category);
              this.selectedCategory.name = '';
              this.selectedCategory._id = '';
            });
        }
      });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(res => {
        this.categories = res as Category[];
      });
  }

  editCategory(category: Category) {
    this.categoryService.selectedCategory = category;
  }

  deleteCategory(_id: string) {
    if (confirm('Está seguro de querer eliminarlo?')) {
      this.categoryService.deleteCategory(_id)
        .subscribe(res => {
          this.getCategories();
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.categoryService.selectedCategory = new Category();
    }
  }

}
