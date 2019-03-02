import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
import {  IBaseService } from '../../services/base.service';
import { FormGroup } from '@angular/forms';
import { AppInjector } from 'src/app/app-injector';

export interface IBaseComponent{
    createForm() : void;
    initializeFormGroup() : void;
}

export class BaseComponent<T> implements OnInit, IBaseComponent  {
    
    form: FormGroup;
    entity : T;
    service : IBaseService<T>;
    notificationService: NotificationService;
    dialogRef: MatDialogRef<BaseComponent<T>>;

  constructor(service: IBaseService<T>,
    dialogRef: MatDialogRef<BaseComponent<T>>,
    data : T) { 
        this.service = service; 
        this.notificationService = AppInjector.get(NotificationService);
        this.dialogRef = dialogRef;
        this.entity = data;
    }

  ngOnInit() {
    this.service.findAll();
    this.createForm();
    if(this.entity != null){
      this.form.setValue(this.entity);
    } 
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {   
    if (this.form.valid) {
      let val = this.form.value;
      delete val.$key;
      if (!this.form.get('$key').value){        
        this.service.create( val );
      }else{
        this.service.update(val, this.form.get('$key').value);
      }  
      this.form.reset();
      this.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  createForm() {
    throw new Error('Only implement on child');
  }

  initializeFormGroup(){
    throw new Error('Only implement on child');
  }
}