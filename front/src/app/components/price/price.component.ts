import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getNoImage } from '../../../assets/noimage';
import { PriceService } from '../../services/price.service';
import { Price } from 'src/app/models/price-model';
import { ValidateService } from './../../services/validate.service';
import { ProductService } from '../../services/product.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceForm: FormGroup;
  noImage = getNoImage();
  prodCode: string;
  actualPage: Number = 1;
  productFileImage = '';
  loading = false;
  searchResult;
  inputSearch = '';

  constructor(
    private fb: FormBuilder,
    private priceService: PriceService,
    private validateService: ValidateService,
    private productService: ProductService
  ) {
    this.priceForm = fb.group({
      'productForm': fb.group({
        'product': ['']
      }),
      'provider': fb.group({
        '_id': [''],
        'name': ['']
      }),
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllPriceItems();
  }

  addSearchResult(product, event) {
    event.preventDefault();
    this.priceForm.get('productForm.product').setValue('');
    this.priceForm.get('productForm.product').setValue(product);
    this.displayProductImage(product);
    this.inputSearch = product.brand.name + ' - ' + product.name;
    this.searchResult = '';
  }

  addPrice() {
    if (!this.validateService.validatePriceForm(this.priceForm)) {
      return;
    }

    this.priceService.postPrice(this.priceForm.value)
      .subscribe(res => {
        const price = res as Price;
        this.prodCode = price.productCode;
        this.getAllPriceItems();
      });
  }

  getAllPriceItems() {
    this.priceService.getPriceLst()
      .subscribe(res => {
        this.priceService.prices = res as Price[];
      });
  }

  displayProductImage(product) {
    if (product) {
      this.productFileImage = product.fileImg;
    }
  }

  deletePrice(price: Price): void {
    if (confirm('Desea eliminar este item de Precios?')) {
      this.priceService.prices = this.priceService.prices.filter(s => s !== price);
      this.priceService.deletePrice(price).subscribe();
    }
  }

  getFormattedPrice(price: number) {
    const currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }

  searchProduct(event) {
    const searchValue = event.target.value;
    
    if (searchValue !== '') {
      if (searchValue.trim() === '') {
        alert("dato no valido");
        this.searchResult = '';
        return;
      }

      this.loading = true;

      const searchWhithOneSpace = RemoveWhiteSpaces(searchValue);
      console.log(searchWhithOneSpace)
      this.productService.searchProductByName(searchWhithOneSpace)
        .subscribe(res => {
          this.loading = false;
          this.searchResult = res;
        });
    }
  }

}
