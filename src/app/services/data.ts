import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ye zaroori hai
})
export class DatabaseService {
  [x: string]: any; // Class ka naam 'DatabaseService' rakhein
  
  // Modern Angular injection tarika
  private firestore: Firestore = inject(Firestore); 

  constructor() {}
  getFeedbacks(): Observable<any[]> {
    const feedbackRef = collection(this.firestore, 'feedbacks');
    // Latest feedback upar dikhane ke liye orderBy use karein
    const q = query(feedbackRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  // ✅ Feedback save karne ka method
  async saveFeedback(feedbackData: any) {
    const feedbackRef = collection(this.firestore, 'feedbacks');
    return addDoc(feedbackRef, { 
      ...feedbackData, 
      createdAt: new Date() 
    });
  }
  // Fetch projects from Firestore
  getProjects(): Observable<any[]> {
    const projectRef = collection(this.firestore, 'projects');
    return collectionData(projectRef, { idField: 'id' });
  }

 // ✅ saveLead ko saveContact mein badal dein
async saveContact(contactData: any) {
  const leadRef = collection(this.firestore, 'leads');
  return addDoc(leadRef, { ...contactData, timestamp: new Date() });
}

  // Sector Expertise Data
  getExpertise() {
    return [
      { id: '01', title: 'Web Experience', icon: 'monitor', desc: 'Crafting high-speed Angular ecosystems.' },
      { id: '02', title: 'Cloud Engine', icon: 'cloud', desc: 'Firebase & GCP integration for zero latency.' }
    ];
  }
  

async saveApplication(applicationData: any) {
    const appRef = collection(this.firestore, 'applications'); 
    return addDoc(appRef, { 
      ...applicationData, 
      submittedAt: new Date() 
    });
  }
}