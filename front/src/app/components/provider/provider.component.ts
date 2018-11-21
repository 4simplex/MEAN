import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/provider-model';

declare var M: any;

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
    this.getProviders();
  }

  addProvider(form: NgForm){
    if(form.value._id){
      this.providerService.putProvider(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Updated successfuly'});
        this.getProviders();
      })
    }else{
      this.providerService.postProvider(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save successfuly'});
        this.getProviders();
      });
    }
  }

  getProviders(){
    this.providerService.getProviders()
      .subscribe(res => {
        this.providerService.providers = res as Provider[];
        console.log(res);
      });
  }

  editProvider(provider: Provider){
    this.providerService.selectedProvider = provider;
  }

  deleteProvider(_id: string){
    if(confirm('Está seguro de querer eliminarlo?')){
      this.providerService.deleteProvider(_id)
        .subscribe(res => {
          M.toast({html: 'Deleted successfuly'});
          this.getProviders();
        });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.providerService.selectedProvider = new Provider();
    }
  }

}
