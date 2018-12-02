import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../models/provider-model';
import { FormGroup } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-provider-selector',
  templateUrl: './provider-selector.component.html',
  styleUrls: ['./provider-selector.component.css']
})
export class ProviderSelectorComponent implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;
  
  constructor(private httpProvider: ProviderService) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
    this.httpProvider.getProviders()
      .subscribe(res => {
        this.httpProvider.providers = res as Provider[];
        M.AutoInit()
      });
  }

}
