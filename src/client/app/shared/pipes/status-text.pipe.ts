import { Pipe, PipeTransform } from '@angular/core';
import { WORKER_STATUS } from '../../../../shared/types';

@Pipe({
  name: 'statusText',
  standalone: true,
  pure: true,
})
export class StatusTextPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case WORKER_STATUS.RUNNING:
        return 'Гадает';
      case WORKER_STATUS.TERMINATED:
        return 'Остановлена';
      default:
        return 'Неизвестно';
    }
  }
}
