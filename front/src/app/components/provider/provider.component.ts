import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/provider-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  selectedProvider: Provider;
  providers: Provider[];

  constructor(private providerService: ProviderService) {
    this.selectedProvider = new Provider();
  }

  ngOnInit() {
    this.getProviders();
  }

  addProvider(form: NgForm) {
    let name = form.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.providerService.getProviderByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('El producto ya existe');
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.providerService.postProvider({ name } as Provider)
            .subscribe(provider => {
              console.log(provider);
              this.providers.push(provider);
              this.selectedProvider.name = '';
              this.selectedProvider._id = '';
            });
        }
      });

    /*if(form.value._id){
      this.providerService.putProvider(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getProviders();
      })
    }else{
      this.providerService.postProvider(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getProviders();
      });
    }*/
  }

  getProviders() {
    this.providerService.getProviders()
      .subscribe(res => {
        this.providers = res as Provider[];
        console.log(res);
      });
  }

  editProvider(provider: Provider) {
    this.providerService.selectedProvider = provider;
  }

  deleteProvider(_id: string) {
    if (confirm('Está seguro de querer eliminarlo?')) {
      this.providerService.deleteProvider(_id)
        .subscribe(res => {
          this.getProviders();
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.providerService.selectedProvider = new Provider();
    }
  }

}
