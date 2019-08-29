import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppAuthGuard} from 'src/app-auth.guard';
import {AppNoAuthGuard} from 'src/app-noauth.guard';

// TODO V2 une page pour les erreurs
const routes: Routes = [
  { path: '',
  //  canActivate: [ AppNoAuthGuard ],
    redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then( m => m.AuthModule)},
  { path: 'x',
    canActivate: [ AppAuthGuard ],
    loadChildren: () => import('./shared/components/footer-menu/footer-menu.module').then(m => m.FooterMenuModule)
  },
  // { path: 'notifications', loadChildren: './features/user/notifications/notifications.module#NotificationsPageModule' },
  // { path: 'notifications', loadChildren: './features/user/containers/notifications/notifications.module#NotificationsPageModule' },
  // { path: 'in-progress', loadChildren: './features/user/containers/in-progress/in-progress.module#InProgressPageModule' },
  // { path: 'notif', loadChildren: './features/user/containers/notif/notif.module#NotifPageModule' },
  // { path: 'menu-footer', loadChildren: './shared/menu-footer/menu-footer.module#MenuFooterModule' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'user', loadChildren: () => import('./features/user/user-module').then( m => m.UserModule)},
  // { path: 'lend', loadChildren: () => import('./features/lend/lend-module').then( m => m.LendModule)},
  // TOASK une page error
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



