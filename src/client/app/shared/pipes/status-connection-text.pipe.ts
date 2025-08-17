import { Pipe, PipeTransform } from '@angular/core';
import { SOCKET_EVENT } from '../../../../shared/types';

@Pipe({
  name: 'statusConnectionText',
  standalone: true,
  pure: true,
})
export class StatusConnectionTextPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case SOCKET_EVENT.CONNECTING:
        return 'Connecting...';
      case SOCKET_EVENT.CONNECT:
        return 'Connected';
      case SOCKET_EVENT.DISCONNECT:
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  }
}
