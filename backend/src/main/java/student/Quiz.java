package student;

import java.sql.Timestamp;
import java.util.List;

public class Quiz {
    String id;
    Timestamp startedAt;
    Timestamp endedAt;
    int totalQuestions;
    int correctAnswered;
    List<QuizQuestions> questions;

    public Quiz(String id, Timestamp startedAt, Timestamp endedAt, int totalQuestions, int correctAnswered) {
        this.id = id;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.totalQuestions = totalQuestions;
        this.correctAnswered = correctAnswered;
    }

    public void setQuestions(List<QuizQuestions> questions) {
        this.questions = questions;
    }

    public String getId() {
        return id;
    }
}