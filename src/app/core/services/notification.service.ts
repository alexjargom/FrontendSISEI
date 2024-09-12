import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeNotify } from '../var/variables';

@Injectable()
export class NotificationService {
  constructor(private notification: NzNotificationService, private message: NzMessageService) {}

  // Notificaciones
  createBasicNotification(title: string, desc: string , position: NzNotificationPlacement = 'bottomRight'): void {
    this.notification.blank( title, desc, { nzPlacement: position } );
  }

  createNotification(type: TypeNotify, title: string, message: string, position: NzNotificationPlacement = 'bottomRight'): void {
    this.notification.create(type , title, message , {nzPlacement : position});
  }

  infoNotificacion(message: string): void {
    this.notification.create( TypeNotify.info , 'Información' , message , {nzPlacement : 'bottomRight'} );
  }

  successNotification(message: string): void {
    this.notification.create( TypeNotify.success , 'Exito' , message , {nzPlacement : 'bottomRight'} );
  }

  errorNotification(message: string): void {
    this.notification.create( TypeNotify.error , 'Error' , message , {nzPlacement : 'bottomRight'} );
  }

  // mensajes
  succesMessage(text: string): void {
    this.message.success(text);
  }

  errorMessage(text: string): void {
    this.message.error(text);
  }
  infoMessage(text: string): void {
    this.message.info(text);
  }
  warningMessage(text: string): void {
    this.message.warning(text);
  }

}
