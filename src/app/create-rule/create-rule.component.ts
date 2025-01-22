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
import { processInput } from '../util/util';
import { Router } from '@angular/router';

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
  rulesOptionWithPrice = ['>', '<', 'equal', 'not equal'];
  rulesOptionWithoutPrice = ['equal', 'not equal'];
  rulesOption: string[] = this.rulesOptionWithoutPrice;
  newFormGroup = new FormGroup({
    selectedField: new FormControl(''),
    price: new FormControl(0),
    selectedRule: new FormControl(''),
    fieldValue: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) {
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

  onSubmit() {
    if (this.showPriceField) {
      this.newFormGroup.value.fieldValue = null;
    } else {
      this.newFormGroup.value.price = null;
    }
    this.http
      .post<any>(
        'http://localhost:3000/api/rules',
        processInput(this.newFormGroup.value)
      )
      .subscribe((response) => {
        console.log('Response:', response);
      });

    this.router.navigate(['/rules']);
  }
}
