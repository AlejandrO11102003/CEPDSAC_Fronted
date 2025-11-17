import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdminComponent } from '../../components/sidebar-admin/sidebar-admin.component';
import { SidebarAdminv2Component } from '../../components/sidebar-adminv2/sidebar-adminv2.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarAdminComponent, SidebarAdminv2Component],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
