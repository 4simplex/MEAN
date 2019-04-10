import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-card',
  templateUrl: './change-card.component.html',
  styleUrls: ['./change-card.component.css']
})
export class ChangeCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript('../assets/js/mp.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
