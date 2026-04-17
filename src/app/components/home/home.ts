import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../services/data';
import emailjs from '@emailjs/browser';
interface Project {
  id: number;
  title: string;
  category: string;
  domain: string;
  techStack: string[];
  description: string;
  keyFeatures: string[];
  image: string;
  year: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  providers: [DatabaseService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  contactForm: FormGroup;
  jobForm: FormGroup;
  feedbackForm: FormGroup;
  showFeedbackForm = false;
  allFeedbacks$!: Observable<any[]>;
  showToast = false;
  toastMessage = '';
  
  // Process Steps Data
  processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding your idea and conducting market research is our first step.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'With 5+ years of experience, we select the best tech stack (Angular/Ionic).'
    },
    {
      number: '03',
      title: 'Execution',
      description: 'High-speed coding and robust architecture building is our expertise.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'After rigorous testing, we launch bug-free products.'
    }
  ];
domain: any;

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService,
    private zone: NgZone
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      project_name: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.jobForm = this.fb.group({
      candidate_name: ['', Validators.required],
      candidate_email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      experience: ['', Validators.required],
      portfolio_link: ['', Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.showFeedbackForm = true;
    }, 3000);
    this.allFeedbacks$ = this.dbService.getFeedbacks();
  }

  closeFeedback() {
    this.showFeedbackForm = false;
  }

  onWrapperClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('popup-wrapper')) {
      this.closeFeedback();
    }
  }

  // ========== EXPLORE SOLUTIONS BUTTON FUNCTION (UPDATED) ==========
  exploreSolutions() {
    // Scroll to contact form section
    const contactSection = document.getElementById('inquiry-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Pre-fill the message field with solution inquiry
      this.contactForm.patchValue({
        message: 'I am interested in your enterprise solutions. Please contact me to discuss:\n\n' +
                 '• Custom Web Development (Angular/.NET Core)\n' +
                 '• Mobile Application Development (Ionic/Capacitor)\n' +
                 '• Cloud Infrastructure Solutions (Firebase/Google Cloud)\n\n' +
                 'Looking forward to your response.'
      });
      
      // Highlight the message field
      setTimeout(() => {
        const messageField = document.querySelector('textarea[formControlName="message"]');
        if (messageField) {
          messageField.classList.add('highlight-field');
          setTimeout(() => {
            messageField.classList.remove('highlight-field');
          }, 2000);
        }
      }, 500);
      
      // Show toast notification
      this.showToastMessage('📋 Solutions inquiry form loaded! Please fill your details.');
    }
  }

  // ========== SCROLL TO SOLUTIONS SECTION (For other buttons) ==========
  scrollToSolutions() {
    const solutionsSection = document.getElementById('solutions-section');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Add highlight effect
      solutionsSection.classList.add('highlight-section');
      setTimeout(() => {
        solutionsSection.classList.remove('highlight-section');
      }, 2000);
    }
  }

  // ========== SCROLL TO CONTACT SECTION ==========
  scrollToContact() {
    const contactSection = document.getElementById('inquiry-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ========== TOAST NOTIFICATION ==========
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // ========== CONTACT FORM SUBMIT ==========
  async submitForm() {
    if (this.contactForm.valid) {
      try {
        await this.dbService['saveContact'](this.contactForm.value);
        await emailjs.send('service_5xtjfvm', 'template_rxnqwxp', {
          to_email: 'codecatalystitsolution@gmail.com',
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          message: this.contactForm.value.message
        }, 'nh8GmEeX34avKDexU');

        this.showToastMessage('✅ Query sent! Our team will reach out within 24 hours.');
        this.contactForm.reset();
      } catch (err) {
        console.error("Contact Form Error:", err);
        this.showToastMessage('❌ Error sending message. Please try again.');
      }
    } else {
      this.showToastMessage('⚠️ Please fill all required fields correctly.');
      this.markFormFieldsTouched();
    }
  }

  markFormFieldsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  // ========== JOB APPLICATION SUBMIT ==========
  async submitJobApplication() {
    if (this.jobForm.valid) {
      try {
        await this.dbService['saveApplication'](this.jobForm.value);
        await emailjs.send('service_hjhwee6', 'template_rxnqwxp', {
          to_email: 'codecatalystitsolution@gmail.com',
          from_name: this.jobForm.value.candidate_name,
          position: this.jobForm.value.position,
          experience: this.jobForm.value.experience,
          resume: this.jobForm.value.portfolio_link
        }, 'nh8GmEeX34avKDexU');

        this.showToastMessage('✅ Application Received! We will contact you soon.');
        this.jobForm.reset();
      } catch (err) {
        console.error("Submission Error:", err);
        this.showToastMessage('❌ Error submitting application. Please try again.');
      }
    } else {
      this.showToastMessage('⚠️ Please fill all job application fields.');
    }
  }

  // ========== FEEDBACK SUBMIT ==========
  async submitFeedback() {
    if (this.feedbackForm.valid) {
      this.zone.run(async () => {
        try {
          await this.dbService.saveFeedback(this.feedbackForm.value);
          this.showFeedbackForm = false;
          this.feedbackForm.reset();
          this.showToastMessage('Thank you for your feedback!');
        } catch (err) {
          console.error("Feedback Save Error:", err);
          this.showToastMessage('Error saving feedback. Please try again.');
        }
      });
    } else {
      this.showToastMessage('Please fill all feedback fields.');
    }
  }

  // ========== HANDLE CONTACT CLICK (Footer) ==========
  handleContactClick() {
    const element = document.getElementById('inquiry-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // Add this interface and data to your existing component



// Add this array in your component
projects: Project[] = [
  {
    id: 1,
    title: 'CareFinder',
    category: 'Healthcare Ecosystem',
    domain: 'Health-Tech',
    techStack: ['Angular', 'Firebase', 'Google Maps API', 'RxJS'],
    description: 'Real-time doctor-patient connectivity platform with emergency hospital tracking system.',
    keyFeatures: [
      'Real-time doctor-patient connectivity',
      'Emergency hospital tracking',
      'Ambulance booking system',
      'Reactive Programming (RxJS)',
      'Secure authentication'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    year: '2024'
  },
  {
    id: 2,
    title: 'Lease Health Check',
    category: 'Data Analytics',
    domain: 'Prop-Tech',
    techStack: ['Angular Material', '.NET Core', 'SQL Server'],
    description: 'Data-driven questionnaire system for evaluating complex lease agreements.',
    keyFeatures: [
      'Complex questionnaire logic',
      'Data validation & processing',
      'High-volume data handling',
      'Custom Angular Material styling',
      'Real estate analytics'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    year: '2024'
  },
  {
    id: 3,
    title: 'CRC Pro Portfolio',
    category: 'Agency Portfolio',
    domain: 'Services / Provider',
    techStack: ['Angular', 'SCSS', 'Vercel', 'Standalone Components'],
    description: 'Modern agency portfolio showcasing UI/UX design and performance optimization.',
    keyFeatures: [
      'Modern bento-grid design',
      'Glassmorphism effects',
      'Performance optimization',
      'Responsive design',
      'Standalone components architecture'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    year: '2025'
  },
  {
    id: 4,
    title: 'Grocery Delivery System',
    category: 'Mobile App',
    domain: 'E-commerce / Logistics',
    techStack: ['Ionic', 'Capacitor', 'Firebase'],
    description: 'Cross-platform mobile app for grocery delivery with real-time tracking.',
    keyFeatures: [
      'Single codebase for Android/iOS',
      'Real-time order tracking',
      'Payment gateway integration',
      'Push notifications',
      'Inventory management'
    ],
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    year: '2024'
  },
  {
    id: 5,
    title: 'Venkat / Banker',
    category: 'Fintech',
    domain: 'Banking & Finance',
    techStack: ['.NET Core', 'SQL Server', 'Angular', 'JWT'],
    description: 'Secure banking application with transaction management and user authentication.',
    keyFeatures: [
      'Secure transaction management',
      'JWT authentication',
      'Banking logic implementation',
      'Database relations design',
      'User role management'
    ],
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800&q=80',
    year: '2023'
  },
  {
    id: 6,
    title: 'Quiz Examination App',
    category: 'Ed-Tech',
    domain: 'Education',
    techStack: ['Java', 'Firebase', 'Android Studio'],
    description: 'Dynamic quiz platform with instant results and timer-based examination.',
    keyFeatures: [
      'Dynamic question fetching',
      'Timer logic implementation',
      'Instant result generation',
      'Score tracking',
      'Firebase integration'
    ],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    year: '2023'
  },
  {
    id: 7,
    title: 'Property Data Analyzer',
    category: 'Legacy Data',
    domain: 'Data Science',
    techStack: ['Python', 'Excel Automation', 'SQL'],
    description: 'Data cleaning and analysis tool for property owners data from 2018-2021.',
    keyFeatures: [
      'Data cleaning automation',
      'Excel integration',
      'SQL data processing',
      'Historical data analysis',
      'Report generation'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    year: '2022'
  }
];

selectedProject: Project | null = null;
showProjectModal = false;
activeFilter = 'all';
domains = ['all', 'Health-Tech', 'Prop-Tech', 'IT Solutions', 'E-commerce / Logistics', 'Banking & Finance', 'Education', 'Data Science'];

get filteredProjects() {
  if (this.activeFilter === 'all') {
    return this.projects;
  }
  return this.projects.filter(p => p.domain === this.activeFilter);
}

openProjectModal(project: Project) {
  this.selectedProject = project;
  this.showProjectModal = true;
  document.body.style.overflow = 'hidden';
}

closeProjectModal() {
  this.showProjectModal = false;
  this.selectedProject = null;
  document.body.style.overflow = '';
}

setFilter(filter: string) {
  this.activeFilter = filter;
}
// Add to your component
faqs = [
  {
    question: 'What is your development process?',
    answer: 'We follow Agile methodology with 2-week sprints. Regular client demos and feedback sessions ensure transparency.',
    open: false
  },
  {
    question: 'How much do your services cost?',
    answer: 'Pricing depends on project scope. We offer flexible engagement models - fixed price, time & material, or dedicated team.',
    open: false
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes! We offer 3 months of free support post-launch, then affordable maintenance packages.',
    open: false
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Timeline varies by complexity. A typical web app takes 8-12 weeks, mobile app 12-16 weeks.',
    open: false
  }
];

toggleFaq(index: number) {
  this.faqs[index].open = !this.faqs[index].open;
}
}