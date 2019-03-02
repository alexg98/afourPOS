import { BaseListComponent } from "./base/base-list.component";
import { Servicio } from '../models/business.model';
import { ServicioService } from '../services/servicio.service';
import { Injector, Component } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { DialogConfig } from '../utilities/global';
import { ServicioComponent } from './servicio.component';

@Component({
    selector: 'app-servicio-list',
    templateUrl: '../view/servicio-list.component.html'
  })
export class ServicioListComponent extends BaseListComponent<Servicio> {

    constructor(service: ServicioService){
        super(service,
            ['nombre', 'precio', 'estado','actions']);
    }

    openDialog(data : any){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = DialogConfig.disableClose;
        dialogConfig.autoFocus = DialogConfig.autoFocus;
        dialogConfig.width = DialogConfig.width;
        if(data != null){
          dialogConfig.data = data;
        }      
        this.dialog.open(ServicioComponent,dialogConfig);
      }
}