import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-admin',
  imports: [],
  templateUrl: './search-bar-admin.component.html',
  styleUrl: './search-bar-admin.component.css'
})
export class SearchBarAdminComponent {
  @Input() placeholderText: string = 'Search...';
  @Input() nuevoBotonName: string = 'Generic button'
  
  @Output() onSearch: any;
}
