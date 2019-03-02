import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { Servicio } from '../models/business.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
  })
export class ServicioService extends BaseService<Servicio> {
    
    constructor(firebase: AngularFireDatabase){
        super(firebase, 'servicios');        
    }
}