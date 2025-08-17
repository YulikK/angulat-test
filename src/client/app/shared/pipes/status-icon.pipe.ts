import { Pipe, PipeTransform } from '@angular/core';
import { WORKER_STATUS } from '../../../../shared/types';

@Pipe({
  name: 'statusIcon',
  standalone: true,
  pure: true,
})
export class StatusIconPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case WORKER_STATUS.RUNNING:
        return 'play_circle';
      case WORKER_STATUS.TERMINATED:
        return 'done';
      default:
        return 'help';
    }
  }
}
