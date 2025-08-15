import { Pipe, PipeTransform } from '@angular/core';
import { WorkerLog } from '../../../../shared/types';

@Pipe({
  name: 'recentLogs',
  standalone: true,
  pure: true,
})
export class RecentLogsPipe implements PipeTransform {
  transform(logs: WorkerLog[] | undefined): WorkerLog[] {
    if (!logs || logs.length === 0) {
      return [];
    }
    return [...logs].reverse();
  }
}
