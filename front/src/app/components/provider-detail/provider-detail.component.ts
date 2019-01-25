import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Provider } from '../../models/provider-model';
import { ProviderService } from '../../services/provider.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {
  @Input() provider: Provider;

  constructor(private route: ActivatedRoute,
    private providerService: ProviderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.providerService.getProvider(id)
      .subscribe(b => this.provider = b);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const name = this.provider.name;
    if (name.trim() === '') {
      alert('Dato no válido. Debe escribir un proveedor');
      return;
    }
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const localId = this.route.snapshot.paramMap.get('id');

    this.providerService.getProviderByName(nameWithOneSpace, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.providerService.putProvider(this.provider)
              .subscribe(() => this.goBack());
          } else {
            alert('El producto ya existe');
          }
        }

        if (res == null) {
          this.providerService.putProvider(this.provider)
            .subscribe(() => this.goBack());
        }
      });
  }
}
