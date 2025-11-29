import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonsAdminComponent } from '../action-buttons-admin/action-buttons-admin.component';

@Component({
  selector: 'app-data-table-admin',
  standalone: true,
  imports: [ActionButtonsAdminComponent, CommonModule],
  templateUrl: './data-table-admin.component.html',
  styleUrl: './data-table-admin.component.css',
})
export class DataTableAdminComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
}
