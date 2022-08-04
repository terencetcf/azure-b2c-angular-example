import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicPageComponent } from './public-page/public-page.component';
import { ProtectedPageComponent } from './protected-page/protected-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'CLIENT_ID',
      redirectUri: 'http://localhost:4200',
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
    'mail.read',
  ]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

@NgModule({
  declarations: [AppComponent, PublicPageComponent, ProtectedPageComponent],
  imports: [BrowserModule, AppRoutingModule, MsalModule, HttpClientModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
