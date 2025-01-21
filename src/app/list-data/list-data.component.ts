import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Trade } from '../../../schema';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

export type ResponseData = {
  success: boolean;
  message: string;
  filteredTrades?: Trade[];
};

@Component({
  selector: 'app-list-data',
  imports: [CommonModule, TableModule],
  templateUrl: './list-data.component.html',
  styleUrl: './list-data.component.css',
})
export class ListDataComponent {
  trades: Trade[] = [];

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  ngOnInit() {
    this.http
      .get<ResponseData>('http://localhost:3000/api/trades')
      .subscribe((result) => {
        // process the configuration.
        const { filteredTrades } = result;
        this.trades = filteredTrades || [];
      });
  }
}
