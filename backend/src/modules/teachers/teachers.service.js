// In-memory Teacher Data Store (can be mapped to DB in production)
let TEACHERS = [
  { id: 'T-101', name: 'Mr. Rajesh Kumar', subject: 'Physics & General Science', dept: 'Science', maxLoad: 28, currentLoad: 24, status: 'Active', attendance: '98%', email: 'rajesh.kumar@greenfieldis.edu' },
  { id: 'T-102', name: 'Dr. Sunita Menon', subject: 'Organic Chemistry & Bio-Chem', dept: 'Science', maxLoad: 26, currentLoad: 22, status: 'Active', attendance: '95%', email: 'sunita.menon@greenfieldis.edu' },
  { id: 'T-103', name: 'Mr. Arvind Swaminathan', subject: 'Pure Mathematics & Stats', dept: 'Mathematics', maxLoad: 30, currentLoad: 26, status: 'Active', attendance: '97%', email: 'arvind.s@greenfieldis.edu' },
  { id: 'T-104', name: 'Mrs. Kavita Verma', subject: 'English Language & Lit', dept: 'Humanities', maxLoad: 26, currentLoad: 20, status: 'Active', attendance: '99%', email: 'kavita.v@greenfieldis.edu' },
  { id: 'T-105', name: 'Mr. Amitav Sen', subject: 'Computer Science & AI', dept: 'Technology', maxLoad: 28, currentLoad: 22, status: 'Active', attendance: '96%', email: 'amitav.sen@greenfieldis.edu' },
  { id: 'T-106', name: 'Mrs. Meenakshi Sundaram', subject: 'History & Global Civics', dept: 'Humanities', maxLoad: 25, currentLoad: 21, status: 'Active', attendance: '94%', email: 'meenakshi.s@greenfieldis.edu' },
  { id: 'T-107', name: 'Mr. Kiran Sharma', subject: 'Applied Mathematics', dept: 'Mathematics', maxLoad: 28, currentLoad: 27, status: 'On Leave', attendance: '91%', email: 'kiran.sharma@greenfieldis.edu' },
  { id: 'T-108', name: 'Dr. Shalini Gupta', subject: 'Botany & Environmental Science', dept: 'Science', maxLoad: 24, currentLoad: 18, status: 'Active', attendance: '99%', email: 'shalini.g@greenfieldis.edu' }
];

export class TeachersService {
  static async getAllTeachers() {
    return TEACHERS;
  }

  static async getTeacherById(id) {
    return TEACHERS.find((t) => t.id === id) || null;
  }

  static async createTeacher(data) {
    const newTeacher = {
      id: `T-${100 + TEACHERS.length + 1}`,
      ...data,
      status: 'Active',
      attendance: '100%',
    };
    TEACHERS.push(newTeacher);
    return newTeacher;
  }

  static async updateTeacher(id, updateData) {
    const index = TEACHERS.findIndex((t) => t.id === id);
    if (index === -1) return null;
    TEACHERS[index] = { ...TEACHERS[index], ...updateData };
    return TEACHERS[index];
  }
}
