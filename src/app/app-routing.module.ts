import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProtectedPageComponent } from './protected-page/protected-page.component';
import { PublicPageComponent } from './public-page/public-page.component';

const routes: Routes = [
  {
    path: 'public-page',
    component: PublicPageComponent,
  },
  {
    path: 'protected-page',
    component: ProtectedPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PublicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
