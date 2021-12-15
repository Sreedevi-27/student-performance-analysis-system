package student;

public class Attendance {
    int semester;
    int attendance;
    String subjectId;
    String subjectName;

    public Attendance(int semester, int attendance, String subjectId, String subjectName) {
        this.semester = semester;
        this.attendance = attendance;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }
}
