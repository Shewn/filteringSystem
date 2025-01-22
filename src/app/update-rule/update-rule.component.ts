import { Component, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rule } from '../../../schema';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { processInput } from '../util/util';

export type ResponseData = {
  success: boolean;
  message: string;
  rules: Rule[];
};

@Component({
  selector: 'app-update-rule',
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
  templateUrl: './update-rule.component.html',
  styleUrl: './update-rule.component.css',
})
export class UpdateRuleComponent {
  rule: Partial<Rule> = {};
  ruleId: WritableSignal<number> = signal(0);
  fieldOption: string[] = [
    'Trade number',
    'Portfolio',
    'Counterparty',
    'Price',
  ];

  fieldReverseMap = new Map([
    ['trade_number', 'Trade number'],
    ['portfolio', 'Portfolio'],
    ['counterparty', 'Counterparty'],
    ['price', 'Price'],
  ]);

  operatorReverseMap = new Map([
    ['>', '>'],
    ['<', '<'],
    ['equals', 'equal'],
    ['not_equals', 'not equal'],
    ['between', 'in between'],
  ]);

  showPriceField: boolean = false;
  rulesOptionWithPrice = ['>', '<', 'equal', 'not equal', 'in between'];
  rulesOptionWithoutPrice = ['equal', 'not equal'];
  rulesOption: string[] = this.rulesOptionWithoutPrice;
  newFormGroup: FormGroup = new FormGroup({});
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  isPriceField(field: any) {
    return field === 'price';
  }

  ngOnInit() {
    this.http
      .get<ResponseData>('http://localhost:3000/api/trades')
      .subscribe((result) => {
        // process the configuration.
        const { rules } = result;
        this.rule = rules[0] || [];
        this.ruleId.set(this.rule.rule_id || 0);
        this.newFormGroup = new FormGroup({
          selectedField: new FormControl(
            this.fieldReverseMap.get(this.rule.field || 'trade_number')
          ),
          price: new FormControl(
            this.isPriceField(this.rule.field) ? this.rule.value : 0
          ),
          selectedRule: new FormControl(
            this.operatorReverseMap.get(this.rule.operator || '>')
          ),
          fieldValue: new FormControl(
            !this.isPriceField(this.rule.field) ? this.rule.value : ''
          ),
        });
      });
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
    const payload = processInput(this.newFormGroup.value);
    payload.rule_id = this.ruleId();
    this.http
      .put<any>(`http://localhost:3000/api/rules/${this.ruleId()}`, payload)
      .subscribe((response) => {
        console.log('Response:', response);
      });
  }
}
