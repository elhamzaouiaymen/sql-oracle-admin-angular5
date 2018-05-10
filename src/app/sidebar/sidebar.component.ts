import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'profile', title: 'Profiles',  icon:'ti-view-list', class: '' },
    { path: 'table', title: 'Tables',  icon:'ti-view-list-alt', class: '' },
    { path: 'tablespace', title: 'Tablespaces',  icon:'ti-harddrives', class: '' },
    { path: 'users', title: 'Users',  icon:'ti-user', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
