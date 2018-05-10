import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'; 
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ITableData } from '../models/ITabledata';
import { ITablespace } from '../models/ITablespace';
@Component({
    selector: 'ts-cmp',
    moduleId: module.id,
    templateUrl: 'tablespace.component.html'
})

export class TablespaceComponent implements OnInit{

    modalRef: BsModalRef;
    public dataLoaded = false;
    tablespace: ITablespace ;
    public tablespaceData: ITableData;
    constructor(private api: ApiService, private modalService: BsModalService){
        this.tablespace = {
            TABLESPACE: "",
            INITIAL_EXT: "",
            MAX_EXT: "",
            MIN_EXT: "",
            NEXT_EXT: "",
            PCT_INCREASE: "",
            datafile:"",
            size: ""
        }

        this.api.getAllTablespaces().subscribe((response)=>{
            console.log(response);
            this.tablespaceData.dataRows= this.splitIntoRows(response,1);
            this.dataLoaded = true;
        },(error)=>console.log(error));

    }

    ngOnInit(){
        this.tablespaceData = {
            headerRow: ['TABLESPACE_NAME', 'INITIAL_EXTENT', 'NEXT_EXTENT','MIN_EXTENTS','MAX_EXTENTS','PCT_INCREASE'],
            dataRows: []
        };
    }


    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }

    fileEvent(fileInput: any){
        let file = fileInput.target.files[0];
        this.tablespace.datafile = file.name;
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


    createTablespace(){
        console.log(this.tablespace);
        this.api.createTablespace(this.tablespace).subscribe((response)=>{
            if(response.status === 200){
                Swal({
                    title: 'Parfait',
                    text: 'Tablespace a été créé avec succès !',
                    type: 'success',
                    confirmButtonText: 'OK'
                  }).then((action)=>{
                    if(action.value){
                       
                    }
                  })
            }
        });
    }
}
