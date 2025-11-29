import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  signal,
  OnInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
  Event,
} from '@angular/router';
import { filter } from 'rxjs';
import { CursoDiplomadoService } from '../../core/services/curso-diplomado.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  hasScrolled = signal(false);
  isOffcanvasOpen = signal(false);
  currentView = signal<'main' | 'cursos' | 'diplomados'>('main');
  isAuthenticated = signal(false);

  isHome = false;
  categoriasCursos: Array<{ id: string; nombre: string }> = [];
  categoriasDiplomados: Array<{ id: string; nombre: string }> = [];

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private cursoDiplomadoService = inject(CursoDiplomadoService);

  ngOnInit(): void {
    // Detectar ruta para transparencia
    this.checkRoute(this.router.url);
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });

    this.checkAuth();
    this.cargarCategorias();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('storage', (ev) => {
        if (ev.key === 'jwt_token') this.checkAuth();
      });
    }
  }

  private checkRoute(url: string) {
    this.isHome = url === '/' || url === '/home';
    this.updateScrollState();
  }

  private checkAuth() {
    this.isAuthenticated.set(this.authService.isLoggedIn());
  }

  cargarCategorias(): void {
    // Lógica optimizada para extraer categorías únicas
    const extraer = (items: any[]) => {
      const map = new Map<string, string>();
      items.forEach(
        (i) =>
          i.categoria &&
          map.set(i.categoria.idCategoria.toString(), i.categoria.nombre)
      );
      return Array.from(map.entries()).map(([id, nombre]) => ({ id, nombre }));
    };

    this.cursoDiplomadoService
      .listarCursos()
      .subscribe((res) => (this.categoriasCursos = extraer(res)));
    this.cursoDiplomadoService
      .listarDiplomados()
      .subscribe((res) => (this.categoriasDiplomados = extraer(res)));
  }

  onLogout(): void {
    this.authService.logout();
    this.checkAuth();
    this.router.navigateByUrl('/');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollState();
  }

  private updateScrollState() {
    if (!isPlatformBrowser(this.platformId)) return;
    const isScrolled = window.scrollY > 50;

    // Si NO es home, siempre se comporta como "scrolled" (fondo blanco)
    if (!this.isHome) {
      this.hasScrolled.set(true);
    } else {
      this.hasScrolled.set(isScrolled);
    }
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen.update((v) => !v);
    if (this.isOffcanvasOpen()) this.currentView.set('main');
  }
  closeOffcanvas() {
    this.isOffcanvasOpen.set(false);
    setTimeout(() => this.currentView.set('main'), 300);
  }
  setView(view: 'main' | 'cursos' | 'diplomados') {
    this.currentView.set(view);
  }
  goBack() {
    this.currentView.set('main');
  }
}
