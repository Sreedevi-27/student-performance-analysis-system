package student;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StudentService {
    private final StudentRepo studentRepo = new StudentRepo();
    private final Map<String, List<QuizQuestions>> quizQuestions = new HashMap();

    public Student getStudent(String studentId){
        return studentRepo.getStudent(studentId);
    }

    public List<Mark> getMarks(String studentId){
         return studentRepo.getMarks(studentId);
    }

    public List<Attendance> getAttendance(String studentId){
        return studentRepo.getAttendance(studentId);
    }

    public Performance getPerformance(String studentId){
        return studentRepo.getPerformance(studentId);
    }

    public Quiz getQuiz(String studentId){
        Quiz quiz = studentRepo.createQuiz(studentId);
        String quizId = quiz.getId();
        if (quizQuestions.containsKey(quizId)) {
            quiz.setQuestions(quizQuestions.get(quizId));
        } else {
            List<QuizQuestions> questions = studentRepo.getQuestions();
            quizQuestions.put(quizId, questions);
            quiz.setQuestions(questions);
        }
        return quiz;
    }

    public Quiz updateQuiz(String quizId, Map<String, String> answers){
        int marks = studentRepo.getQuizMarks(answers);
        return studentRepo.updateQuizMarks(marks, quizId);
    }
}
