import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category-model';
import { FormGroup, FormControl } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css'],
})
export class CategorySelectorComponent implements OnInit {

  constructor(private httpCategory: CategoryService) {}

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var options= {};
      var elem = document.querySelector('select');
      var instances = M.FormSelect.init(elem, options);
    });
    this.getCategories();
  }

  getCategories() {
    this.httpCategory.getCategories()
      .subscribe(res => {
        this.httpCategory.categories = res as Category[];
        M.AutoInit();
      });
  }

}
