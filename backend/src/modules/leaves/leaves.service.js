import { eventBus, DOMAIN_EVENTS } from '../../core/events/eventBus.js';
import { NotFoundError, BadRequestError } from '../../core/errors/AppError.js';

let LEAVES = [
  {
    id: 'LV-2026-089',
    teacherId: 'T-107',
    teacherName: 'Mr. Kiran Sharma',
    subject: 'Applied Mathematics',
    department: 'Mathematics',
    dates: 'Oct 02 - Oct 04 (3 Days)',
    reason: 'Medical Emergency (Surgical Procedure)',
    type: 'Medical Leave',
    status: 'Pending Review',
    appliedOn: '2026-10-01 18:30',
    impactLevel: 'High',
    affectedClasses: [
      { period: 'Period 1 (08:30 - 09:15)', class: 'Grade 10-A', room: 'Room 302', status: 'Unassigned' },
      { period: 'Period 3 (10:15 - 11:00)', class: 'Grade 12-Science', room: 'Math Lab B', status: 'Unassigned' },
      { period: 'Period 5 (12:30 - 01:15)', class: 'Grade 11-A', room: 'Room 204', status: 'Unassigned' }
    ]
  },
  {
    id: 'LV-2026-088',
    teacherId: 'T-102',
    teacherName: 'Dr. Sunita Menon',
    subject: 'Organic Chemistry',
    department: 'Science',
    dates: 'Oct 03 (1 Day)',
    reason: 'National CBSE Chemistry Symposium',
    type: 'Duty Leave',
    status: 'Pending Review',
    appliedOn: '2026-10-01 14:15',
    impactLevel: 'Moderate',
    affectedClasses: [
      { period: 'Period 2 (09:15 - 10:00)', class: 'Grade 12-Science', room: 'Chemistry Lab', status: 'Unassigned' },
      { period: 'Period 6 (01:15 - 02:00)', class: 'Grade 11-B', room: 'Room 108', status: 'Unassigned' }
    ]
  }
];

export class LeavesService {
  static async getAllLeaves() {
    return LEAVES;
  }

  static async getLeaveById(id) {
    return LEAVES.find((l) => l.id === id) || null;
  }

  static async createLeave(data) {
    const newLeave = {
      id: `LV-2026-${String(LEAVES.length + 90).padStart(3, '0')}`,
      status: 'Pending Review',
      appliedOn: new Date().toISOString().replace('T', ' ').slice(0, 16),
      impactLevel: data.impactLevel || 'Moderate',
      ...data,
    };
    LEAVES.unshift(newLeave);

    // Publish domain event
    eventBus.publish(DOMAIN_EVENTS.LEAVE_REQUESTED, newLeave);

    return newLeave;
  }

  static async updateStatus(id, { status, adminNotes, substitutePlan }) {
    const leave = LEAVES.find((l) => l.id === id);
    if (!leave) throw new NotFoundError('Leave request not found');

    if (!['Approved', 'Rejected', 'Under Review'].includes(status)) {
      throw new BadRequestError('Invalid leave status');
    }

    leave.status = status;
    if (adminNotes) leave.adminNotes = adminNotes;
    if (substitutePlan) leave.substitutePlan = substitutePlan;

    if (status === 'Approved') {
      eventBus.publish(DOMAIN_EVENTS.LEAVE_APPROVED, { leave, substitutePlan });
    } else if (status === 'Rejected') {
      eventBus.publish(DOMAIN_EVENTS.LEAVE_REJECTED, { leave, reason: adminNotes });
    }

    return leave;
  }
}
