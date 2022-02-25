import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { DefaultComponent } from "./default.component";

const DefaultRouterConfig : Routes = [
  {path:'', component:DefaultComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(DefaultRouterConfig)
  ],
  exports:[RouterModule]
})
export class DefaultRoutingModule{}
