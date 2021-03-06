import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MpService } from './../../services/mp.service';
import { Router } from '@angular/router';
import { appLiterals } from '../../resources/appLiteral';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userMP;
  userSubscription;
  appLiterals;
  cardName;
  cardType;
  cardDigits;
  cardThumbnail;
  nextPayment;
  invoices;
  reloadUserSubscription;
  changeSubscription;

  constructor(
    private authService: AuthService,
    private mpService: MpService,
    private router: Router
  ) {
    this.appLiterals = appLiterals;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getUserCards(this.user);
      this.getUserSuscription(this.user);
      
    },
    err => {
      console.log(err);
      return false;
    });

    
  }

  getUserCards(user) {
    this.mpService.getUserCards(user.customer)
      .subscribe(res => {
        this.userMP = res;

        if(this.userMP){
          let items = this.userMP.status.cards.length;
          console.log(items)
          this.cardName = this.userMP.status.cards[items - 1].payment_method.name;
          this.cardType = this.userMP.status.cards[items - 1].payment_method.payment_type_id;
          this.cardDigits = this.userMP.status.cards[items - 1].last_four_digits;
          this.cardThumbnail = this.userMP.status.cards[items - 1].payment_method.secure_thumbnail;
        }
        
      });
  }

  getUserSuscription(user) {
    this.mpService.getUserSuscription(user.suscription)
      .subscribe(res => {
        this.userSubscription = res;
        if(this.userSubscription){
          this.nextPayment = this.userSubscription.status.charges_detail.next_payment_date;
          this.invoices = this.userSubscription.status.charges_detail.invoices;
        }
      });
  }

  cancelSuscription(status) {
    //this.reloadUserSubscription = this.getUserSuscription(this.user);
    let currentUserLog = JSON.parse(window.localStorage.getItem('user'));
    this.mpService.cancelUserSuscription(this.userSubscription.status.id, status, currentUserLog.id)
      .subscribe(res => {
        this.changeSubscription = res;
        if(this.changeSubscription.status.status === "authorized"){
          alert("Bienvenido nuevamente a Premium");
          window.location.href = '/profile';
        }

        if(this.changeSubscription.status.status === "paused"){
          alert("Cancelaste tu suscripción. Ahora estas en el plan gratuito");
          window.location.href = '/profile';
        }
      });
  }

}
