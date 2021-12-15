package tutor;

import student.Student;

import java.util.List;

public class TutorService {
    private TutorRepo tutorRepo = new TutorRepo();

    public Tutor getTutor(String tutorId){
        return tutorRepo.getTutor(tutorId);
    }

    public List<Student> getStudents(String tutorId) {
        return tutorRepo.getStudents(tutorId);
    }

    public Student updateStudent(String studentId, Student student) {
        return tutorRepo.updateStudent(studentId, student);
    }
    public void addStudent(Student student) {
        tutorRepo.addStudent(student);
    }
    public void deleteStudent(String studentId) {
        tutorRepo.deleteStudent(studentId);
    }
}
