let STUDENTS = [
  { id: 'S-2024-001', name: 'Aarav Sharma', grade: 'Grade 10', section: 'A', rollNo: '10A-01', attendance: '96%', gpa: '3.92', parentName: 'Mr. Rajesh Sharma', feeStatus: 'Paid' },
  { id: 'S-2024-002', name: 'Ananya Reddy', grade: 'Grade 10', section: 'A', rollNo: '10A-02', attendance: '98%', gpa: '4.00', parentName: 'Dr. Suresh Reddy', feeStatus: 'Paid' },
  { id: 'S-2024-003', name: 'Rohan Mehta', grade: 'Grade 10', section: 'B', rollNo: '10B-01', attendance: '92%', gpa: '3.65', parentName: 'Mrs. Neha Mehta', feeStatus: 'Pending' },
  { id: 'S-2024-004', name: 'Diya Patel', grade: 'Grade 11', section: 'A', rollNo: '11A-04', attendance: '95%', gpa: '3.88', parentName: 'Mr. Vikram Patel', feeStatus: 'Paid' },
  { id: 'S-2024-005', name: 'Vihaan Joshi', grade: 'Grade 11', section: 'B', rollNo: '11B-07', attendance: '89%', gpa: '3.42', parentName: 'Mr. Alok Joshi', feeStatus: 'Overdue' },
  { id: 'S-2024-006', name: 'Ishaan Verma', grade: 'Grade 12', section: 'A', rollNo: '12A-03', attendance: '97%', gpa: '3.95', parentName: 'Mrs. Sunita Verma', feeStatus: 'Paid' },
  { id: 'S-2024-007', name: 'Saanvi Iyer', grade: 'Grade 12', section: 'B', rollNo: '12B-02', attendance: '99%', gpa: '4.00', parentName: 'Mr. R. Iyer', feeStatus: 'Paid' }
];

export class StudentsService {
  static async getAllStudents() {
    return STUDENTS;
  }

  static async getStudentById(id) {
    return STUDENTS.find((s) => s.id === id) || null;
  }

  static async createStudent(data) {
    const newStudent = {
      id: `S-2026-${String(STUDENTS.length + 1).padStart(3, '0')}`,
      ...data,
      feeStatus: data.feeStatus || 'Pending',
    };
    STUDENTS.push(newStudent);
    return newStudent;
  }
}
