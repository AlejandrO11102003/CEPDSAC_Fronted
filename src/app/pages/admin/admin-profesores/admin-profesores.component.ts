import { Component } from '@angular/core';
import { SearchBarAdminComponent } from "../../../components/search-bar-admin/search-bar-admin.component";
import { DataTableAdminComponent } from "../../../components/data-table-admin/data-table-admin.component";

@Component({
  selector: 'app-admin-profesores',
  imports: [SearchBarAdminComponent, DataTableAdminComponent],
  templateUrl: './admin-profesores.component.html',
  styleUrls: ['../../admin/admin-styles.css','./admin-profesores.component.css']
  
})
export class AdminProfesoresComponent {

}
