import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CursosModel } from '../../models/cursos.model';
import { CURSOS_DATA } from '../../data/cursos.data';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
})
export class CursosComponent {
  cursos: CursosModel = CURSOS_DATA;
}
