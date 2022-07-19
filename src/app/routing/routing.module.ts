import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {JobDescriptionComponent} from "../home/job-description/job-description.component";
import {AppComponent} from "../app.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: ":id",
    component: JobDescriptionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class RoutingModule { }
