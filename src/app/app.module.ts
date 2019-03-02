import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ApplicationRef } from '@angular/core';

import { MaterialAppModule } from './ngmaterial.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { environment } from '../environments/environment';
import { ClientService } from './shared/clients.service';
import { DepartmentService } from './shared/department.service';
import { DatePipe } from '@angular/common';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ServicioListComponent } from './components/servicio-list.component';
import { ServicioComponent } from './components/servicio.component';
import { ServicioService } from './services/servicio.service';
import { setAppInjector } from './app-injector';

@NgModule({
  declarations: [
    AppComponent, 
    ClientsComponent, 
    ClientComponent,
    ClientListComponent,
    MatConfirmDialogComponent,
    //Base
    ServicioListComponent,
    ServicioComponent
  ],
  imports: [
    ReactiveFormsModule, 
    BrowserModule, 
    BrowserAnimationsModule, 
    MaterialAppModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [ClientService, ServicioService, DepartmentService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[ClientComponent, MatConfirmDialogComponent,ServicioComponent]
})
export class AppModule { 

  constructor(private injector: Injector) {
    setAppInjector(injector);
  }
}