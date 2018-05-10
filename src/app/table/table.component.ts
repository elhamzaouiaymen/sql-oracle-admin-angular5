import { Component,Inject,OnInit, OnChanges, TemplateRef,ViewChild, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import {ApiService} from '../services/api.service';
import { DataTablesModule } from 'angular-datatables';
import { ITableData } from '../models/ITabledata';




@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    styleUrls:['table.component.css'],
    templateUrl: 'table.component.html'
})


export class TableComponent implements OnInit {
    public dataLoaded = false;
    public tableData1: ITableData;
    public tablespaces:string [];
 

    constructor(public api:ApiService){
      this.api.getAllTableUsers().subscribe((response)=>{
      console.log(response);

      this.tableData1.dataRows= this.splitIntoRows(response,1);
       this.dataLoaded = true;
    },(error)=>console.log(error));

    }


   



   splitIntoRows(items, itemsPerRow) {
    let rslt = [];
    items.forEach(function(item, index) {
        var rowIndex = Math.floor(index / itemsPerRow),
            colIndex = index % itemsPerRow;
        if (!rslt[rowIndex]) {
            rslt[rowIndex] = [];
        }
        rslt[rowIndex][colIndex] = item;
    });
    return rslt;
}


    ngOnInit(){
        this.tableData1 = {
            headerRow: ['TABLE_NAME', 'TABLESPACE_NAME', 'CLUSTER_NAME', 'IOT_NAME','STATUS','PCT_FREE'],
            dataRows: []
        };
    }









}


