import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar-admin',
  standalone: true,
  templateUrl: './search-bar-admin.component.html',
  styleUrl: './search-bar-admin.component.css',
})
export class SearchBarAdminComponent {
  @Input() placeholderText: string = 'Search...';
  @Input() nuevoBotonName: string = 'Generic button';

  // Evento para avisar al padre que se hizo click en Nuevo
  @Output() onNewClick = new EventEmitter<void>();
}
