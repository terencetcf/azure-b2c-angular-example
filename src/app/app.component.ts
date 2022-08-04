import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Login with B2C';

  apiResponse?: string;

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient
  ) {
    // msalService.instance.getActiveAccount()
  }
  async ngOnInit(): Promise<void> {
    const response = await this.msalService.instance.handleRedirectPromise();
    if (response?.account != null) {
      this.msalService.instance.setActiveAccount(response.account);
    }
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
    // this.msalService
    //   .loginPopup()
    //   .subscribe((response: AuthenticationResult) => {
    //     this.msalService.instance.setActiveAccount(response.account);
    //   });
  }

  logout() {
    this.msalService.logout();
  }

  callProfile() {
    this.httpClient
      .get('https://graph.microsoft.com/v1.0/me')
      .subscribe((response) => {
        this.apiResponse = JSON.stringify(response);
      });
  }

  callMessages() {
    this.httpClient
      .get('https://graph.microsoft.com/v1.0/me/messages')
      .subscribe((response) => {
        this.apiResponse = JSON.stringify(response);
      });
  }
}
