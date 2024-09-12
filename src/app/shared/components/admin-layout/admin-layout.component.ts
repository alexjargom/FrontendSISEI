import { TipoUsuario } from './../../../core/var/variables';
import { Logger, UserService } from 'src/app/core';
import { MenuModel, MenuDependencia, MenuAdmin, MenuRoot } from './menu.model';
import { Component, OnInit } from '@angular/core';
const log = new Logger('AdminLayoutComponent');

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  menus: MenuModel[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(): void {
    const us = this.userService.getCurrentUser();
    switch (us.TipoUsuarioId as TipoUsuario) {
      case TipoUsuario.Root:
        this.menus = MenuRoot;
        break;
      case TipoUsuario.Admin:
        this.menus = MenuAdmin;
        break;
      case TipoUsuario.Dependencia:
        log.debug('is dependencia user', us.DependenciaId, '  ___  ', us.ComiteId);
        this.menus = MenuDependencia(us.DependenciaId ?? '', us.ComiteId ?? '');
        log.debug('menu =>', this.menus);
        break;
    }
  }

  actionMenu(menu: string[]): void {
    if (menu.length > 0 && menu[0] == 'logout') {
      this.userService.logout();
    }
  }

}
