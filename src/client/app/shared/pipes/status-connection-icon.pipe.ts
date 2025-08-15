import { Pipe, PipeTransform } from '@angular/core';
import { SOCKET_EVENT } from '../../../../shared/types';

@Pipe({
  name: 'statusConnectionIcon',
  standalone: true,
  pure: true,
})
export class StatusConnectionIconPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case SOCKET_EVENT.CONNECTING:
        return 'wifi_connecting';
      case SOCKET_EVENT.CONNECT:
        return 'wifi_find';
      case SOCKET_EVENT.DISCONNECT:
        return 'wifi_off';
      default:
        return 'help';
    }
  }
}
