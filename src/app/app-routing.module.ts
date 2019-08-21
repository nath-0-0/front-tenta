import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path: '',
  loadChildren: () => import('./shared/components/footer-menu/footer-menu.module').then(m => m.FooterMenuModule)},
 // { path: 'menu-footer', loadChildren: './shared/menu-footer/menu-footer.module#MenuFooterModule' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user', loadChildren: () => import('./features/user/user-module').then( m => m.UserModule)},
  { path: 'lend', loadChildren: () => import('./features/lend/lend-module').then( m => m.LendModule)},
  { path: 'auth', loadChildren: () => import('./features/auth/auth-module').then( m => m.AuthModule)},
  { path: 'footer-menu', loadChildren: './shared/components/footer-menu/footer-menu.module#FooterMenuPageModule' },
// TOASK une page error
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



