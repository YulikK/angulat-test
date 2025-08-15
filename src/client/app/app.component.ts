import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardComponent],
  template: `<app-dashboard></app-dashboard>`,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Magic Sessions Center';
}
