import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IUser} from '../models/IUser';
import Swal from 'sweetalert2'; 
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ITableData } from '../models/ITabledata';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {
  user : IUser ;
  modalRef: BsModalRef;
  dataLoaded: boolean = false;
  public usersData: ITableData;
  constructor(private api :ApiService, private modalService: BsModalService) {
    this.user = {
      name  : "",
      password : ""
    }
    this.api.getAllUsers().subscribe((response)=>{
      console.log(response);
      this.usersData.dataRows= this.splitIntoRows(response,1);
      this.dataLoaded = true;
  },(error)=>console.log(error));
   }
  

  ngOnInit() {
    this.usersData = {
      headerRow: ['USERNAME', 'USER_ID', 'PASSWORD','ACCOUNT_STATUS','CREATED','EXPIRY_DATE','PROFILE'],
      dataRows: []
  };
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>){
    this.modalRef.hide();
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


createUser():void {
  this.api.createUser(this.user).subscribe((response)=>{
    console.log(response)
      if(response.status === 200){
          Swal({
              title: 'Parfait',
              text: 'Utilisateur a été crée avec succès',
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
