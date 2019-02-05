import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { SaleService } from '../../services/sale.service';
import { Price } from 'src/app/models/price-model';
import { Sale } from 'src/app/models/sale-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  units = 1;
  products = [];
  total;
  sale: Sale;
  prices;
  priceFound;
  loading = false;

  constructor(
    private priceService: PriceService,
    private saleService: SaleService) { }

  ngOnInit() {
  }

  searchProduct(event) {
    const searchValue = event.target.value;
    if (searchValue !== '') {
      if (searchValue.trim() === '') {
        alert('Dato no válido. Debe escribir un nombre de producto.');
        this.prices = '';
        return;
      }

      this.loading = true;

      const searchWhithOneSpace = RemoveWhiteSpaces(searchValue);
      this.priceService.getPriceByName(searchWhithOneSpace)
        .subscribe(res => {
          this.loading = false;
          this.prices = res;
        });
    }
  }

  addSearchResult(price, event) {
    event.preventDefault();
    const priceId = price._id;
    if (this.priceFound) {
      if (this.priceFound._id === priceId) {
        alert('El producto ya esta en pantalla');
        return;
      }
    }

    if (this.products.length > 0) {
      const isExistingProduct = this.products.find(product => product._id === priceId);
      if (isExistingProduct) {
        alert('El producto ya esta en pantalla');
        return;
      }
    }

    this.priceFound = price as Price[];
    this.prices = '';
  }

  addProduct(product) {
    const productData = { ...product };
    const totalPriceByUnits = this.calculatePriceByUnits(productData.salePrice);

    productData.units = this.units;
    productData.priceForUnits = totalPriceByUnits;

    this.products.push(productData);
    this.totalAmount();
    this.priceFound = '';
  }

  calculatePriceByUnits(price) {
    return price * this.units;
  }

  changeUnits(stock) {
    if (this.units < 1) {
      this.units = 1;
      return;
    }
    if (this.units > stock) {
      alert('No tiene el stock suficiente para esa cantidad de unidades a vender');
      this.units = 1;
    }
  }

  modifyProduct(product, event) {
    const currentProduct = this.products.find(item => item._id === product._id);
    if (event.target.value < 1) {
      currentProduct.units = 1;
      currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
      this.totalAmount();
      return;
    }
    if (event.target.value > product.stock) {
      alert('No tiene el stock suficiente para esa cantidad de unidades a vender');
      currentProduct.units = 1;
      currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
      this.totalAmount();
      return;
    }

    currentProduct.units = event.target.value;
    currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
    this.totalAmount();
  }

  totalAmount() {

    const total =
      this.products.map(item => item.priceForUnits)
        .reduce((acc, currentValue) => {
          return acc + currentValue;
        }, 0);
    this.total = total;
  }

  deleteProduct(prod) {
    this.products = this.products.filter(item => item !== prod);
    this.totalAmount();
  }

  sell() {
    if (confirm('Desea concretar la Venta?')) {
      this.sale = new Sale();
      this.sale.saleTotal = this.total;
      this.sale.productsGroup = this.products.map(product => {
        product.stock = product.stock - product.units;
        return product;
      });

      this.saleService.postSale(this.sale)
        .subscribe(res => {
          alert('Venta registrada');
          this.products = [];
        });
      this.products.map(product => {
        this.priceService.updatePrice(product)
          .subscribe(res => {
            if (res) {
              console.log('Stock actualizado');
            }
          });
      });
    }
  }

  cancelSell() {
    if (confirm('Desea cancelar la venta?')) {
      this.products = [];
    }
  }

  getFormattedPrice(price: number) {
    let currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }

}
