import { eventBus, DOMAIN_EVENTS } from '../../core/events/eventBus.js';

let INQUIRIES = [
  {
    id: 'ADM-2026-001',
    studentName: 'Aanya Kulkarni',
    gradeApplyingFor: 'Grade 6',
    parentName: 'Mr. Rohan Kulkarni',
    parentEmail: 'rohan.k@gmail.com',
    parentPhone: '+91 98765 43210',
    status: 'In Review',
    submittedAt: '2026-10-01 11:20',
  },
  {
    id: 'ADM-2026-002',
    studentName: 'Devansh Saxena',
    gradeApplyingFor: 'Grade 9',
    parentName: 'Mrs. Neha Saxena',
    parentEmail: 'neha.saxena@outlook.com',
    parentPhone: '+91 98112 34567',
    status: 'Interview Scheduled',
    submittedAt: '2026-10-02 09:15',
  }
];

export class AdmissionsService {
  static async getAllInquiries() {
    return INQUIRIES;
  }

  static async submitInquiry(data) {
    const newInquiry = {
      id: `ADM-2026-${String(INQUIRIES.length + 1).padStart(3, '0')}`,
      status: 'Submitted',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ...data,
    };
    INQUIRIES.unshift(newInquiry);

    eventBus.publish(DOMAIN_EVENTS.ADMISSION_SUBMITTED, newInquiry);

    return newInquiry;
  }
}
