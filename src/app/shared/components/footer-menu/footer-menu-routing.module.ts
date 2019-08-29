import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterMenuPage } from './footer-menu.page';
import { AppAuthGuard } from 'src/app-auth.guard';

// TODO V2 Améliorer les routes en mettant celles qui le doivent dans les enfants
// TOASK peut on faire des menu et sous menus pour éviter qu'ont aie toutes les routes à parcourir ou cela ne vaut pas la peine?
const routes: Routes = [
  {
    path: 'fm',
    component: FooterMenuPage,
    children:[
      {
        path: 'search',
        children: [
          {
            path: '',
      //      canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/lend/containers/search/search.module').then(m => m.SearchModule)
          }
        ]
      },
      {
        path: 'inProgress',
        children: [
          {
            path: '',
      //      canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/user/containers/in-progress/in-progress.module').then(m => m.InProgressPageModule)
          }
        ]
      },

      {
        path: 'home',
        children: [
          {
            path: '',
            canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'notifs',
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/features/user/containers/notif/notif.module').then(m => m.NotifPageModule)
          }
        ]
      },
      {
        path: 'tentaItems',
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/features/user/containers/tenta-items/tenta-items.module').then(m => m.TentaItemsModule)
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
       //     canActivate: [ AppNoAuthGuard ],
            loadChildren: () =>
            import('src/app/features/user/containers/profil/profil.module').then(m => m.ProfilModule)
          }
        ]
      },
      {
        path: 'editProfil',
        children: [
          {
            path: '',
           // canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/user/containers/edit-profil/edit-profil.module').then(m => m.EditProfilModule)
          }
        ]
      },
      {
        path: 'item', // insertion
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/user/containers/edit-item/edit-item.module').then(m => m.EditItemModule)
          }
        ]
      },
      {
        path: 'item/:id', // insertion
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/user/containers/edit-item/edit-item.module').then(m => m.EditItemModule)
          }
        ]
      },
       {
        path: 'searchResult/:name/:distance',
        children: [
          {
            path: '',
            canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/lend/containers/search-result/search-result.module').then(m => m.SearchResultModule)
          }
        ]
      },
      {
        path: 'askToLend/:borrower_id/:lender_id/:item_id',
        children: [
          {
            path: '',
     //       canActivate: [ AppAuthGuard ],
            loadChildren: () =>
            import('src/app/features/lend/containers/ask-to-lend/ask-to-lend.module').then(m => m.AskToLendModule)
          }
        ]
      },
      {
        path: 'oneAsk',
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/features/lend/containers/one-ask/one-ask.module').then(m => m.OneAskPageModule)
          }
        ]
      },
      {
        path: 'oneAsk/:lend_id',
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/features/lend/containers/one-ask/one-ask.module').then(m => m.OneAskPageModule)
          }
        ]
      },
      {
        path: 'oneAsk/:lend_id/:item_id',
        children: [
          {
            path: '',
        //    canActivate: [ AppAuthGuard ],
            loadChildren: () =>
              import('src/app/features/lend/containers/one-ask/one-ask.module').then(m => m.OneAskPageModule)
          }
        ]
      },
  ]
      },
      {
        path: '',
      //  canActivate: [ AppNoAuthGuard ],
        redirectTo: 'src/app/home/home',
        pathMatch: 'full'
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class FooterMenuRoutingModule { }


