import { Component, OnInit,TemplateRef } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import {IProfile } from '../models/IProfile';
import { ApiService } from '../services/api.service';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2'; 
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ITableData } from '../models/ITabledata';


@Component({
    selector: 'profile-cmp',
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{
    modalRef: BsModalRef;
    public dataLoaded = false;
    profile: IProfile ;
    public profilesData: ITableData;

    constructor(private api: ApiService, private modalService: BsModalService){
        this.profile = {
            name : "",
            sessions: "",
            cpus: "",
            idle: "",
            elapsedtime: ""
        }

        this.api.getProfiles().subscribe((response)=>{
            console.log(response);
            this.profilesData.dataRows= this.splitIntoRows(response,1);
            this.dataLoaded = true;
        },(error)=>console.log(error));
      
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }

    ngOnInit(){
        this.profilesData = {
            headerRow: ['PROFILE', 'RESOURCE_NAME', 'RESOURCE_TYPE','LIMIT'],
            dataRows: []
        };
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

    createProfile():void {
        this.api.createProfile(this.profile).subscribe((response)=>{
            if(response.status === 200){
                Swal({
                    title: 'Parfait',
                    text: 'Profile a été créé avec succès !',
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
