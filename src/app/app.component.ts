import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    public openCart:boolean = false;
    public cantProducts:number = 0;

    cart(){
        this.openCart = !this.openCart;
        console.log("cart", this.openCart);
        
      }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}