import { Component } from '@angular/core';
import { Rule } from '../../../schema';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../update-rule/update-rule.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-view-rules',
  imports: [TableModule, ButtonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './view-rules.component.html',
  styleUrl: './view-rules.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ViewRulesComponent {
  rules: Rule[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
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

  onEditClick(ruleId: any) {
    this.router.navigate(['/update', ruleId]);
  }

  onCreateButtonClick() {
    this.router.navigate(['/create']);
  }

  onRemoveClick(event: Event, ruleId: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this rule?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.http
          .delete<ResponseData>(`http://localhost:3000/api/rules/${ruleId}`)
          .subscribe(() => {
            this.rules = [];
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Rule deleted',
            });

            this.http
              .get<ResponseData>('http://localhost:3000/api/rules')
              .subscribe((result) => {
                // process the configuration.
                if (result && result.rules) {
                  this.rules = result.rules;
                } else {
                  this.rules = [];
                }
              });
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'Cancel removal',
        });
      },
    });
  }
}
