import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    // subscribe to authentication state chagnes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) =>{
        this.isAuthenticated = result;
        this.getUserDetails(); // get user names
      }
    )
  }
  getUserDetails() {
    if(this.isAuthenticated){
      // fetch the logged in user details (user's claims)

      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) =>{
          this.userFullName = res.name;

          // retrieve the user's email from authentication response
          const theEmail = res.email;
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      )
    }
  }

  logout(){
    // terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }

}
