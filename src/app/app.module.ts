import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProfileComponent }   from './profile/profile.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { ApiService } from './services/api.service';
import { ModalModule } from 'ngx-bootstrap';
import { UsersComponent } from './users/users.component';
import { TablespaceComponent } from './tablespace/tablespace.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    TableComponent,
    TypographyComponent,
    TablespaceComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UsersComponent,
 
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpModule ,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
   ModalModule.forRoot(),
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
