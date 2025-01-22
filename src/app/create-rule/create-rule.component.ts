import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-rule',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    FloatLabelModule,
    SelectModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './create-rule.component.html',
  styleUrl: './create-rule.component.css',
})
export class CreateRuleComponent {
  fieldOption: string[] = [
    'Trade number',
    'Portfolio',
    'Counterparty',
    'Price',
  ];
  showPriceField: boolean = false;
  rulesOptionWithPrice = ['>', '<', 'equal', 'not equal', 'in between'];
  rulesOptionWithoutPrice = ['equal', 'not equal'];
  rulesOption: string[] = this.rulesOptionWithoutPrice;
  newFormGroup = new FormGroup({
    selectedField: new FormControl(''),
    price: new FormControl(0),
    selectedRule: new FormControl(''),
    fieldValue: new FormControl(''),
  });

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  checkField(event: SelectChangeEvent) {
    this.showPriceField = false;
    if (event.value === 'Price') {
      this.showPriceField = true;
      this.rulesOption = this.rulesOptionWithPrice;
    } else {
      this.rulesOption = this.rulesOptionWithoutPrice;
    }
  }

  processInput(
    formValue: Partial<{
      selectedField: string | null;
      price: number | null;
      selectedRule: string | null;
      fieldValue: string | null;
    }>
  ) {
    function getKeyMap(field: any) {
      const fieldMap = new Map([
        ['Trade number', 'trade_number'],
        ['Portfolio', 'portfolio'],
        ['Counterparty', 'counterparty'],
        ['Price', 'price'],
      ]);
      return fieldMap.get(field);
    }

    function getOperator(selectedOperator: any) {
      const operatorMap = new Map([
        ['>', '>'],
        ['<', '<'],
        ['equal', 'equals'],
        ['not equal', 'not_equals'],
        ['in between', 'between'],
      ]);
      return operatorMap.get(selectedOperator);
    }
    return {
      rule_id: 1,
      field: getKeyMap(formValue.selectedField),
      operator: getOperator(formValue.selectedRule),
      value: formValue.fieldValue || formValue.price,
    };
  }

  onSubmit() {
    if (this.showPriceField) {
      this.newFormGroup.value.fieldValue = null;
    } else {
      this.newFormGroup.value.price = null;
    }
    // console.warn(this.newFormGroup.value);
    console.log(this.processInput(this.newFormGroup.value));
    this.http
      .post<any>(
        'http://localhost:3000/api/rules',
        this.processInput(this.newFormGroup.value)
      )
      .subscribe((response) => {
        console.log('Response:', response);
      });
  }
}
