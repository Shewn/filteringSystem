import { Routes } from '@angular/router';
import { ListDataComponent } from './list-data/list-data.component';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { UpdateRuleComponent } from './update-rule/update-rule.component';
import { RemoveRuleComponent } from './remove-rule/remove-rule.component';
import { ViewRulesComponent } from './view-rules/view-rules.component';

export const routes: Routes = [
  { path: 'create', component: CreateRuleComponent },
  { path: 'view', component: ListDataComponent },
  { path: 'update', component: UpdateRuleComponent },
  { path: 'remove', component: RemoveRuleComponent },
  { path: 'rules', component: ViewRulesComponent },
];
