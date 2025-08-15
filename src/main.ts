import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './client/app/app.component';
import { appConfig } from './client/app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
