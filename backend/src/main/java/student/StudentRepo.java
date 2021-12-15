package student;

import config.Config;
import org.apache.tomcat.util.buf.StringUtils;

import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public class StudentRepo {
    public Student getStudent(String studentId){
        try {

            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select id, name, email_id, current_year, department, semester, contact_number, dob, " +
                    "year_of_joining, graduation_year, city from student where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, studentId);

            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            Student student = new Student(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getString("email_id"),
                    resultSet.getInt("current_year"),
                    resultSet.getString("department"),
                    resultSet.getInt("semester"),
                    resultSet.getString("contact_number"),
                    resultSet.getString("dob"),
                    resultSet.getInt("year_of_joining"),
                    resultSet.getInt("graduation_year"),
                    resultSet.getString("city")
            );
            con.close();
            return student;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Mark> getMarks(String studentId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String query = "select marks_and_attendance.id,semester,sub_id,marks,attendance,name from " +
                    "marks_and_attendance inner join subjects on marks_and_attendance.sub_id = subjects.id " +
                    "where marks_and_attendance.id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, studentId);
            ResultSet resultSet = preparedStatement.executeQuery();

            List<Mark> marks = new ArrayList();
            while (resultSet.next()){
                marks.add(new Mark(
                        resultSet.getInt("semester"),
                        resultSet.getInt("marks"),
                        resultSet.getString("sub_id"),
                        resultSet.getString("name")
                ));
            }
            con.close();
            return marks;
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Attendance> getAttendance(String studentId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String query = "select marks_and_attendance.id,semester,sub_id,marks,attendance,name from " +
                    "marks_and_attendance inner join subjects on marks_and_attendance.sub_id = subjects.id " +
                    "where marks_and_attendance.id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, studentId);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<Attendance> attendance = new ArrayList();
            while (resultSet.next()){
                attendance.add(new Attendance(
                        resultSet.getInt("semester"),
                        resultSet.getInt("attendance"),
                        resultSet.getString("sub_id"),
                        resultSet.getString("name")
                ));
            }
            con.close();
            return attendance;
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Performance getPerformance(String studentId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String query = "select avg(marks), avg(attendance), avg(correct_answered) from marks_and_attendance " +
                    "inner join quiz on marks_and_attendance.id = quiz.student_id where student_id= ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, studentId);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            Performance performance = new Performance(
                        resultSet.getInt(1),
                        resultSet.getInt(2),
                        resultSet.getInt(3)
                );
            con.close();
            return performance;
            }  catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    Quiz createQuiz(String studentId) {
        try {
            Quiz quiz;
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String quizForStudent = "SELECT * FROM quiz WHERE started_at > DATE_SUB(NOW(), INTERVAL 1 WEEK)";
            PreparedStatement preparedStatement = con.prepareStatement(quizForStudent );
            ResultSet resultSet = preparedStatement.executeQuery();
            if (!resultSet.next()) {
                UUID uuid = UUID.randomUUID();
                String insertQuery = "INSERT INTO quiz values(?, UTC_TIMESTAMP, null, 15, null, ?)";
                preparedStatement = con.prepareStatement(insertQuery);
                preparedStatement.setString(1, uuid.toString());
                preparedStatement.setString(2, studentId);
                preparedStatement.executeUpdate();
                String getQuery = "SELECT * FROM quiz WHERE id = ?";
                preparedStatement = con.prepareStatement(getQuery);
                preparedStatement.setString(1, uuid.toString());
                resultSet = preparedStatement.executeQuery();
                resultSet.next();

            }
            quiz = new Quiz(
                    resultSet.getString("id"),
                    resultSet.getTimestamp("started_at"),
                    resultSet.getTimestamp("end_at"),
                    resultSet.getInt("total_questions"),
                    resultSet.getInt("correct_answered")
            );
            con.close();
            return quiz;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    List<QuizQuestions> getQuestions(){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String query = "select id, question, options from quiz_questions order by RAND() LIMIT 15";
            PreparedStatement preparedStatement = con.prepareStatement(query);

            ResultSet resultSet = preparedStatement.executeQuery();
            List<QuizQuestions> questions = new ArrayList();
            while (resultSet.next()) {
                questions.add(new QuizQuestions(
                        resultSet.getString("id"),
                        resultSet.getString("question"),
                        resultSet.getString("options")
                ));
            }
            con.close();
            return questions;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    int getQuizMarks(Map<String, String> answers) {
        int count = 0;
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String query = String.format(
                    "select id, answer from quiz_questions where id in (%s)",
                    String.join(",", answers.keySet().stream().map(x -> "?").toArray(String[]::new))
            );
            System.out.println(query);
            PreparedStatement preparedStatement = con.prepareStatement(query);
            String[] keys = answers.keySet().toArray(new String[0]);
            for (int i = 0; i < keys.length; i++) {
                preparedStatement.setString(i+1, keys[i]);
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String questionId= resultSet.getString("id");
                String answer = resultSet.getString("answer");
                count = count + (answers.get(questionId).equals(answer) ? 1 : 0);
            }
            con.close();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return count;
    }

    public Quiz updateQuizMarks(int marks, String quizId) {
        Quiz quiz = null;
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);
            String updateQuery = "update quiz set correct_answered=?, end_at=UTC_TIMESTAMP where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(updateQuery);
            preparedStatement.setInt(1, marks);
            preparedStatement.setString(2, quizId);
            preparedStatement.executeUpdate();
            String getQuery = "select * from quiz where id = ?";
            preparedStatement = con.prepareStatement(getQuery);
            preparedStatement.setString(1, quizId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                quiz = new Quiz(
                    resultSet.getString("id"),
                    resultSet.getTimestamp("started_at"),
                    resultSet.getTimestamp("end_at"),
                    resultSet.getInt("total_questions"),
                    resultSet.getInt("correct_answered")
                );
            }
            con.close();
            return quiz;
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}


