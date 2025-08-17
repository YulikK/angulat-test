import { Pipe, PipeTransform } from '@angular/core';
import { WORKER_STATUS } from '../../../../shared/types';

@Pipe({
  name: 'statusColor',
  standalone: true,
  pure: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case WORKER_STATUS.RUNNING:
        return 'accent';
      case WORKER_STATUS.TERMINATED:
        return 'warn';
      default:
        return 'primary';
    }
  }
}
