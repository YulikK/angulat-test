import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uptime',
  standalone: true,
  pure: true,
})
export class UptimePipe implements PipeTransform {
  transform(startTime: Date | string): string {
    const start = new Date(startTime);
    const now = new Date();
    const diff = now.getTime() - start.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}ч ${minutes % 60}м`;
    } else if (minutes > 0) {
      return `${minutes}м ${seconds % 60}с`;
    } else {
      return `${seconds}с`;
    }
  }
}
