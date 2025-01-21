import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'secondary-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [ButtonModule],
})
export class SecondaryButton {}
