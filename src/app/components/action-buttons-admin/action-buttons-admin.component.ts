import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons-admin',
  standalone: true,
  template: `
    <div class="action-icons">
      <i class="bi bi-pen icon-edit" (click)="onEdit.emit()" title="Editar"></i>
      <i
        class="bi bi-trash icon-delete"
        (click)="onDelete.emit()"
        title="Eliminar"
      ></i>
    </div>
  `,
  styles: [
    `
      .action-icons {
        display: flex;
        gap: 10px;
        justify-content: center;
      }
      .icon-edit {
        color: #ffc107;
        cursor: pointer;
        transition: 0.2s;
      }
      .icon-delete {
        color: #dc3545;
        cursor: pointer;
        transition: 0.2s;
      }
      .icon-view {
        color: #0d6efd;
        cursor: pointer;
        transition: 0.2s;
      }
      i:hover {
        transform: scale(1.2);
      }
    `,
  ],
})
export class ActionButtonsAdminComponent {
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();  
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();
}
