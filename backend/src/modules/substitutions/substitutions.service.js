import { eventBus, DOMAIN_EVENTS } from '../../core/events/eventBus.js';
import { NotFoundError } from '../../core/errors/AppError.js';

let SUBSTITUTIONS = [
  {
    id: 'SUB-2026-101',
    leaveId: 'LV-2026-089',
    originalTeacher: 'Mr. Kiran Sharma',
    period: 'Period 1 (08:30 - 09:15)',
    class: 'Grade 10-A',
    subject: 'Mathematics',
    room: 'Room 302',
    date: '2026-10-02',
    recommendedTeacher: 'Mr. Arvind Swaminathan',
    recommendedTeacherId: 'T-103',
    score: 96,
    status: 'Assigned',
    reasoning: 'Zero timetable conflict, identical subject syllabus expertise (CBSE Class 10 Math), current load 26/30.',
  },
  {
    id: 'SUB-2026-102',
    leaveId: 'LV-2026-089',
    originalTeacher: 'Mr. Kiran Sharma',
    period: 'Period 3 (10:15 - 11:00)',
    class: 'Grade 12-Science',
    subject: 'Pure Mathematics',
    room: 'Math Lab B',
    date: '2026-10-02',
    recommendedTeacher: 'Mr. Rajesh Kumar',
    recommendedTeacherId: 'T-101',
    score: 89,
    status: 'Pending Confirmation',
    reasoning: 'STEM department affinity, free during Period 3, comfortable with Advanced Math & Physics integration.',
  },
  {
    id: 'SUB-2026-103',
    leaveId: 'LV-2026-088',
    originalTeacher: 'Dr. Sunita Menon',
    period: 'Period 2 (09:15 - 10:00)',
    class: 'Grade 12-Science',
    subject: 'Organic Chemistry',
    room: 'Chemistry Lab',
    date: '2026-10-03',
    recommendedTeacher: 'Dr. Shalini Gupta',
    recommendedTeacherId: 'T-108',
    score: 94,
    status: 'Pending Confirmation',
    reasoning: 'Senior Science Dept faculty, lab safety certified, 18/24 weekly periods currently assigned.',
  }
];

export class SubstitutionsService {
  static async getAllSubstitutions() {
    return SUBSTITUTIONS;
  }

  static async assignSubstitute(id, { substituteTeacherId, substituteTeacherName, notes }) {
    const sub = SUBSTITUTIONS.find((s) => s.id === id);
    if (!sub) throw new NotFoundError('Substitution assignment not found');

    sub.recommendedTeacherId = substituteTeacherId || sub.recommendedTeacherId;
    sub.recommendedTeacher = substituteTeacherName || sub.recommendedTeacher;
    sub.status = 'Confirmed & Dispatched';
    sub.notes = notes || sub.notes;

    eventBus.publish(DOMAIN_EVENTS.SUBSTITUTION_ASSIGNED, sub);

    return sub;
  }

  static async generateRecommendationsForLeave(leaveId) {
    return SUBSTITUTIONS.filter((s) => s.leaveId === leaveId);
  }
}
