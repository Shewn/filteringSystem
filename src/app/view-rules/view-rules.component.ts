import { Component } from '@angular/core';
import { Rule } from '../../../schema';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../update-rule/update-rule.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-view-rules',
  imports: [TableModule],
  templateUrl: './view-rules.component.html',
  styleUrl: './view-rules.component.css',
})
export class ViewRulesComponent {
  rules: Rule[] = [];

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  ngOnInit() {
    this.http
      .get<ResponseData>('http://localhost:3000/api/rules')
      .subscribe((result) => {
        // process the configuration.
        const { rules } = result;
        this.rules = rules || [];
      });
  }
}
