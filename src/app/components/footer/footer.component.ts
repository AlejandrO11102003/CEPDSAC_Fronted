import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Link {
  url?: string;
  text: string;
  action?: () => void;
}

interface ContactInfo {
  url: string;
  iconClass: string;
  text: string;
  ariaLabel: string;
}

interface SocialLink {
  url: string;
  iconClass: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  public anioActual: number = new Date().getFullYear();

  public isModalVisible = false;
  public modalTitle = '';
  public modalContent = '';

  public legalLinks: Link[] = [
    {
      text: 'Políticas de Privacidad',
      action: () => this.openModal('privacy'),
    },
    {
      text: 'Términos y Condiciones',
      action: () => this.openModal('terms'),
    },
  ];

  public contactInfo: ContactInfo[] = [
    {
      url: 'https://wa.me/51956782481',
      iconClass: 'fab fa-whatsapp',
      text: '+51 956 782 481',
      ariaLabel: 'Contactar por WhatsApp',
    },
    {
      url: 'mailto:info@cedpsac.com',
      iconClass: 'fas fa-envelope',
      text: 'info@cedpsac.com',
      ariaLabel: 'Enviar correo electrónico',
    },
  ];

  public socialLinks: SocialLink[] = [
    {
      url: '#',
      iconClass: 'fab fa-facebook-f',
      ariaLabel: 'Visita nuestra página de Facebook',
    },
    {
      url: '#',
      iconClass: 'fab fa-instagram',
      ariaLabel: 'Síguenos en Instagram',
    },
    {
      url: '#',
      iconClass: 'fab fa-linkedin-in',
      ariaLabel: 'Conecta con nosotros en LinkedIn',
    },
  ];

  // --- Modal con textos formateados en HTML ---
  openModal(type: 'privacy' | 'terms'): void {
    if (type === 'privacy') {
      this.modalTitle = 'Políticas de Privacidad';
      this.modalContent = `
        <p>📅 <strong>Última actualización: 02/10/2025</strong></p>
        <p>En <strong>CEDP S.A.C.</strong> nos comprometemos a proteger la privacidad y seguridad de nuestros usuarios.</p>
        <p>Recopilamos y tratamos datos personales como nombre, correo electrónico, número de teléfono,
        información de facturación y matrícula, únicamente con fines académicos, administrativos y de facturación.</p>
        <p>Tus datos no serán compartidos con terceros sin tu autorización, salvo proveedores de servicios
        tecnológicos y financieros que son necesarios para operar nuestra plataforma, o en casos de requerimiento legal.</p>
        <p>Tienes derecho a acceder, rectificar o eliminar tus datos, así como oponerte a su uso para
        fines de marketing. Puedes ejercer estos derechos escribiendo a: <strong>info@cedpsac.com</strong>.</p>
        <p>Nuestra plataforma también utiliza cookies para mejorar la experiencia de usuario y fines estadísticos.</p>
      `;
    } else {
      this.modalTitle = 'Términos y Condiciones';
      this.modalContent = `
        <p>📅 <strong>Última actualización: 02/10/2025</strong></p>
        <p>Al acceder y utilizar los servicios de <strong>CEDP S.A.C.</strong>, el usuario acepta los siguientes Términos y Condiciones:</p>
        <ul>
          <li><strong>Registro:</strong> El usuario debe proporcionar datos verídicos al momento de registrarse.</li>
          <li><strong>Pagos:</strong> Todos los pagos son procesados mediante pasarelas seguras. El acceso a cursos se habilita una vez confirmado el pago.</li>
          <li><strong>Acceso:</strong> El acceso a los cursos es personal e intransferible. Compartir credenciales puede ocasionar la suspensión de la cuenta.</li>
          <li><strong>Propiedad Intelectual:</strong> Los contenidos (videos, materiales, guías) son propiedad de CEDP S.A.C. y no pueden ser copiados, distribuidos ni utilizados con fines comerciales sin autorización expresa.</li>
          <li><strong>Reembolsos:</strong> Los reembolsos pueden solicitarse dentro de un plazo determinado siempre que el curso no haya sido consumido significativamente.</li>
          <li><strong>Responsabilidad:</strong> CEDP S.A.C. no garantiza resultados de aprendizaje, ya que estos dependen del compromiso del estudiante.</li>
          <li><strong>Modificaciones:</strong> CEDP S.A.C. se reserva el derecho de actualizar los presentes términos, notificando los cambios en la plataforma.</li>
        </ul>
        <p>El uso continuado de la plataforma implica la aceptación de estas condiciones.</p>
      `;
    }
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
