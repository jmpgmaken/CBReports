import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketReportComponent } from './reports/market-report/market-report.component';

const routes: Routes = [
  {
    path: '',
    component: MarketReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {



 }


