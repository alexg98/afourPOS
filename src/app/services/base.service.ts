import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList, SnapshotAction } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

export interface IBaseService<T>{
    findAll() : Observable<SnapshotAction<T>[]>;
    create(model: T) : void;
    update(model: T, id : string) : void;
    delete(id: string) : void;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> implements IBaseService<T>{

  ref : string;  
  public firebase: AngularFireDatabase

  list: AngularFireList<T>;

  constructor(firebase: AngularFireDatabase,ref : string) { 
    this.firebase = firebase;
    this.ref = ref;
  }
  
  findAll() : Observable<SnapshotAction<T>[]> {
    this.list = this.firebase.list(this.ref);
    return this.list.snapshotChanges();
  }

  create(entity : T) {
    this.list.push(entity);
  }

  update(entity : T, key : string) {
    this.list.update(key,entity);
  }

  delete(key: string) {
    this.list.remove(key);
  }
}