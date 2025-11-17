import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-adminv2',
  imports: [],
  templateUrl: './sidebar-adminv2.component.html',
  styleUrl: './sidebar-adminv2.component.css'
})
export class SidebarAdminv2Component {
  open: boolean = true;
  toggleSidebar() {
    this.open = !this.open;
  }

}
