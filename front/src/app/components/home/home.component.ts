import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appLiterals;

  constructor(private authService: AuthService) {
    this.appLiterals = appLiterals;
  }

  ngOnInit() {
  }

}
