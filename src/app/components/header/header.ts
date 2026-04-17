import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled: boolean = false;
  isMenuOpen: boolean = false;
  currentRoute: string = '';
  activeSection: string = 'home';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.updateActiveSection();
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onWindowScroll();
      this.updateActiveSectionOnScroll();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
      this.updateActiveSectionOnScroll();
    }
  }

  updateActiveSectionOnScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const sections = ['hero', 'solutions-section', 'industries-section', 'expertise-section', 'careers-section'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            this.activeSection = section;
            break;
          }
        }
      }
    }
  }

  updateActiveSection() {
    if (this.currentRoute === '/careers') {
      this.activeSection = 'careers';
    } else {
      this.activeSection = 'home';
    }
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  navigateTo(page: string) {
    this.closeMobileMenu();
    
    if (page === 'careers') {
      this.router.navigate(['/careers']);
      return;
    }
    
    if (this.currentRoute !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(page), 100);
      });
    } else {
      this.scrollToSection(page);
    }
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const elementMap: { [key: string]: string } = {
        'home': 'hero',
        'solutions': 'solutions-section',
        'industries': 'industries-section',
        'expertise': 'expertise-section',
        'contact': 'inquiry-form-section'
      };
      
      const id = elementMap[sectionId] || sectionId;
      const element = document.getElementById(id);
      
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        this.activeSection = id;
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
}