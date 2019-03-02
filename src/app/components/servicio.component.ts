import { Component, Inject } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { ServicioService } from '../services/servicio.service';
import { Servicio } from '../models/business.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicio',
  templateUrl: '../view/servicio.component.html'
})
export class ServicioComponent extends BaseComponent<Servicio> {

    constructor(service: ServicioService,
        dialogRef: MatDialogRef<BaseComponent<Servicio>>,
        @Inject(MAT_DIALOG_DATA) data ) {
        super(service,dialogRef,data);
    }

    createForm() {
        this.form = new FormGroup({
            $key: new FormControl(null),
            nombre: new FormControl('', Validators.required),            
            precio: new FormControl(null, [
              Validators.required,
              Validators.pattern('[0-9]*'),
               Validators.minLength(8)]),            
            estado: new FormControl(false)
          });
    }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nombre: '',
      precio: null,
      estado: false
    });
  }
}   