import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  postedDate: Date;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements OnInit {
  searchQuery: string = '';
  locationQuery: string = '';
  selectedDepartment: string = 'all';
  selectedJobType: string = 'all';
  selectedJob: Job | null = null;
  showJobModal: boolean = false;
  
  departments = ['all', 'Engineering', 'Product', 'Sales', 'Marketing', 'HR', 'Finance'];
  jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Remote'];
  
  allJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Angular Developer',
      department: 'Engineering',
      location: 'Noida, India',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We are looking for an experienced Angular developer to lead our frontend team. You will be responsible for building scalable enterprise applications using Angular 15+.',
      postedDate: new Date('2026-04-10')
    },
    {
      id: 2,
      title: 'Ionic Mobile App Developer',
      department: 'Engineering',
      location: 'Moradabad, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Build cross-platform mobile apps using Ionic Framework and Capacitor. Experience with Firebase and REST APIs is required.',
      postedDate: new Date('2026-04-09')
    },
    {
      id: 3,
      title: '.NET Core Backend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Remote',
      experience: '4+ years',
      description: 'Develop scalable APIs and microservices using .NET Core 6+. Knowledge of SQL Server and Azure is a plus.',
      postedDate: new Date('2026-04-08')
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'Noida, India',
      type: 'Full-time',
      experience: '6+ years',
      description: 'Lead product strategy and roadmap for our enterprise solutions. Experience in B2B SaaS products is preferred.',
      postedDate: new Date('2026-04-07')
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Product',
      location: 'Moradabad, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create beautiful and intuitive user interfaces for web and mobile apps. Proficiency in Figma and Adobe XD is required.',
      postedDate: new Date('2026-04-06')
    },
    {
      id: 6,
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Drive business growth and acquire new enterprise clients. Experience in IT services sales is preferred.',
      postedDate: new Date('2026-04-05')
    },
    {
      id: 7,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Remote',
      experience: '3+ years',
      description: 'Manage SEO, SEM, and social media campaigns. Experience with Google Analytics and HubSpot is required.',
      postedDate: new Date('2026-04-04')
    },
    {
      id: 8,
      title: 'HR Recruiter',
      department: 'HR',
      location: 'Noida, India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Manage end-to-end recruitment and talent acquisition. Experience in IT recruitment is preferred.',
      postedDate: new Date('2026-04-03')
    },
    {
      id: 9,
      title: 'Cloud Architect (AWS/Azure)',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '7+ years',
      description: 'Design and implement cloud infrastructure solutions. AWS or Azure certification is required.',
      postedDate: new Date('2026-04-02')
    },
    {
      id: 10,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Hyderabad, India',
      type: 'Contract',
      experience: '4+ years',
      description: 'Manage CI/CD pipelines and Kubernetes clusters. Experience with Jenkins, Docker, and Git is required.',
      postedDate: new Date('2026-04-01')
    },
    {
      id: 11,
      title: 'Frontend Developer (React)',
      department: 'Engineering',
      location: 'Pune, India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Build responsive web applications using React.js and Redux.',
      postedDate: new Date('2026-03-30')
    },
    {
      id: 12,
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Work on ML models and data analysis using Python and TensorFlow.',
      postedDate: new Date('2026-03-28')
    }
  ];

  filteredJobs: Job[] = [];
dept: any;

  ngOnInit() {
    this.filteredJobs = this.allJobs;
  }

  handleSearch() {
    this.filterJobs();
  }

  filterJobs() {
    this.filteredJobs = this.allJobs.filter(job => {
      const matchesSearch = this.searchQuery === '' || 
        job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesLocation = this.locationQuery === '' || 
        job.location.toLowerCase().includes(this.locationQuery.toLowerCase());
      
      const matchesDepartment = this.selectedDepartment === 'all' || 
        job.department === this.selectedDepartment;
      
      const matchesJobType = this.selectedJobType === 'all' || 
        job.type === this.selectedJobType;
      
      return matchesSearch && matchesLocation && matchesDepartment && matchesJobType;
    });
  }

  onDepartmentChange() {
    this.filterJobs();
  }

  onJobTypeChange() {
    this.filterJobs();
  }

  clearFilters() {
    this.searchQuery = '';
    this.locationQuery = '';
    this.selectedDepartment = 'all';
    this.selectedJobType = 'all';
    this.filterJobs();
  }

  viewJobDetails(job: Job) {
    this.selectedJob = job;
    this.showJobModal = true;
  }

  closeModal() {
    this.showJobModal = false;
    this.selectedJob = null;
  }

  applyForJob(job: Job) {
    alert(`Application process started for ${job.title} position.\n\nPlease send your resume to: careers@codecatalyst.com`);
    this.closeModal();
  }

  getTotalJobsCount(): number {
    return this.filteredJobs.length;
  }
}