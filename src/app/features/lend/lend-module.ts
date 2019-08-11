import { NgModule } from '@angular/core';

import { LendRoutingModule } from './lend-routing.module';
import { AskToLendComponent } from './containers/ask-to-lend/ask-to-lend.component';
import { EvalLendComponent } from './containers/eval-lend/eval-lend.component';
import { SearchComponent } from './containers/search/search.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AskToLendComponent,
    EvalLendComponent,
    SearchComponent,
    SearchResultComponent,

  ],
  imports: [
    SharedModule,
    LendRoutingModule,
    ReactiveFormsModule
  ]
})
export class LendModule { }
