let TIMETABLE_PERIODS = [
  { id: 'P-1', period: 'Period 1', time: '08:30 - 09:15', class: 'Grade 10-A', subject: 'Mathematics', teacher: 'Mr. Arvind Swaminathan (Sub)', room: 'Room 302', status: 'Substituted', impact: 'Covered' },
  { id: 'P-2', period: 'Period 2', time: '09:15 - 10:00', class: 'Grade 11-Science', subject: 'Organic Chemistry', teacher: 'Dr. Sunita Menon', room: 'Chemistry Lab', status: 'Normal', impact: 'None' },
  { id: 'P-3', period: 'Period 3', time: '10:15 - 11:00', class: 'Grade 12-Science', subject: 'Pure Mathematics', teacher: 'Pending Assignment', room: 'Math Lab B', status: 'Critical Alert', impact: 'Uncovered' },
  { id: 'P-4', period: 'Period 4', time: '11:00 - 11:45', class: 'Grade 9-B', subject: 'English Literature', teacher: 'Mrs. Kavita Verma', room: 'Room 105', status: 'Normal', impact: 'None' },
  { id: 'P-5', period: 'Period 5', time: '12:30 - 01:15', class: 'Grade 11-A', subject: 'Applied Mathematics', teacher: 'Pending Assignment', room: 'Room 204', status: 'Warning', impact: 'Uncovered' },
  { id: 'P-6', period: 'Period 6', time: '01:15 - 02:00', class: 'Grade 10-B', subject: 'Computer Science & AI', teacher: 'Mr. Amitav Sen', room: 'AI & Robotics Lab', status: 'Normal', impact: 'None' },
  { id: 'P-7', period: 'Period 7', time: '02:00 - 02:45', class: 'Grade 12-Humanities', subject: 'World History', teacher: 'Mrs. Meenakshi S.', room: 'Room 208', status: 'Normal', impact: 'None' }
];

export class TimetablesService {
  static async getDailySchedule() {
    return TIMETABLE_PERIODS;
  }

  static async updatePeriod(id, data) {
    const period = TIMETABLE_PERIODS.find((p) => p.id === id);
    if (!period) return null;
    Object.assign(period, data);
    return period;
  }
}
