import { OnInit, ViewChild } from '@angular/core';
import { IBaseService } from '../../services/base.service';
import { MatDialog, MatTableDataSource,MatSort,MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';
import { AppInjector } from '../../app-injector';
import { DepartmentService } from '../../shared/department.service';
import { Servicio } from 'src/app/models/business.model';

export class BaseListComponent<T> implements OnInit {

    listData: MatTableDataSource<T>;
    displayedColumns: string[];

    service : IBaseService<T>;
    dialog: MatDialog;
    notificationService: NotificationService;
    dialogService: DialogService;

    departmentService : DepartmentService;

    constructor(service: IBaseService<T>,
      displayedColumns: string[]
      ) { 
        this.service = service;
        this.dialog = AppInjector.get(MatDialog);
        this.notificationService = AppInjector.get(NotificationService);
        this.dialogService = AppInjector.get(DialogService);
        this.departmentService = AppInjector.get(DepartmentService);
        this.displayedColumns = displayedColumns;
      }   
    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;
    
    ngOnInit() {
      this.service.findAll().subscribe(
        list => {         
          let array = list.map(item => {
            return {
              $key: item.key, 
              ...item.payload.val()              
            } as T;
          });

          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && !(data[ele] === false || data[ele] === true)  
                && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
        });
    }
  
    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }
  
    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }
  
    onCreate() {
      this.openDialog(null);
    }
  
    onEdit(row : T){    
      this.openDialog(row);
    }   
  
    onDelete($key : string){
      this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.service.delete($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });
    } 

    openDialog(data : any){
      throw new Error('Only implement on child');
    }  
  }