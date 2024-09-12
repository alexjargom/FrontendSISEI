import {Component, Input, OnInit} from '@angular/core';
import {ComiteModel, ComiteService, ComiteStatusInfo, NotificationService, UserService} from '../../../../core';
import {Status, TipoUsuario} from '../../../../core/var/variables';

@Component({
  selector: 'app-solicitud-comite',
  templateUrl: './solicitud-comite.component.html',
  styleUrls: ['./solicitud-comite.component.scss']
})
export class SolicitudComiteComponent implements OnInit {

  @Input() id = '';
  @Input() data: ComiteModel | null = null;
  loading = true;
  statusRegistroComite = Status;
  comiteStatus?: ComiteStatusInfo = undefined;
  isAdmin = false;

  constructor(public service: ComiteService,
              public serviceUser: UserService,
              private notify: NotificationService) {
    const tipo = this.serviceUser.getCurrentUser().TipoUsuarioId;
    if (tipo === TipoUsuario.Admin) {
      this.isAdmin = true;
    }

  }

  ngOnInit(): void {
    this.comiteStatus = this.getStatus();
  }

  getStatus(): ComiteStatusInfo {
    switch (this.data?.Status) {
      case this.statusRegistroComite.Registrado:
        return {
          status: '403',
          title: 'Comité registrado',
          subtitle: `Debe realizar la solicitud de comité,
           una vez aprobado por un administrador, su proceso
            de registro quedará terminado.`,
          textButton1: 'Solicitar revisión',
          nextStatus: Status.Solicitado
        };
      case this.statusRegistroComite.Aceptado:
        return {
          status: 'success',
          title: 'Comité aprobado',
          subtitle: `Su comité ya fue revisado y aprobado,
           consulte con un administrador para obtener las credenciales de la cuenta en caso de aplicar.`,
          nextStatus: Status.Aceptado
        };
      case this.statusRegistroComite.Rechazado:
        return {
          status: 'error',
          title: 'Comité rechazado',
          subtitle: `El registro de su comité fue rechazado,
           consulte con un administrador el motivo,
            realice sus cambios y vuelva a intentarlo.`,
          textButton1: 'Solicitar revisión',
          nextStatus: Status.Solicitado
        };
      case this.statusRegistroComite.Solicitado:
        return {
          status: 'info',
          title: 'Comité en revisión',
          subtitle: `El comité aún se encuentra en proceso de revisión,
         cuando se tenga una resolución será notificado. `,
          nextStatus: Status.Solicitado
        };
      default:
        return {
          status: '500',
          title: '',
          subtitle: ``,
          nextStatus: Status.Registrado
        };
    }
  }

  updateStatus(status: Status): void {
    this.service.updateStatus(this.id, status).subscribe(e => {
      this.data!.Status = status;
      this.comiteStatus = this.getStatus();
      this.notify.successNotification(e.Mensaje);
    }, err => this.notify.errorNotification(err.Mensaje));
  }
}
