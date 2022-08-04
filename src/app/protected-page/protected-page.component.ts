import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-protected-page',
  templateUrl: './protected-page.component.html',
  styleUrls: ['./protected-page.component.scss'],
})
export class ProtectedPageComponent implements OnInit {
  constructor(private msalService: MsalService) {}

  ngOnInit(): void {}

  getName(): string | undefined {
    return this.msalService.instance.getActiveAccount()?.name;
  }
}
