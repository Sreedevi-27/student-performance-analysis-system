package tutor;

import config.Config;
import student.Student;
import student.StudentRepo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

public class TutorRepo {
    StudentRepo studentRepo = new StudentRepo();
    public Tutor getTutor(String tutorId){
        try {

            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select id, name, email_id, handling_year, department, city, contact_number " +
                            "from tutor where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, tutorId);

            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            Tutor tutor = new Tutor(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getString("email_id"),
                    resultSet.getInt("handling_year"),
                    resultSet.getString("department"),
                    resultSet.getString("city"),
                    resultSet.getString("contact_number")

            );
            con.close();
            return tutor;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Student> getStudents(String tutorId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select s.id, s.name from student as s, tutor as t " +
                    "where s.department = t.department and s.current_year = t.handling_year and t.id = ? limit 10";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, tutorId);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<Student> students = new ArrayList();
            while (resultSet.next()){
                students.add(new Student(
                        resultSet.getString("id"),
                        resultSet.getString("name")
                ));
            }
            con.close();
            return students;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Student updateStudent(String studentId, Student student){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            Map<String,Object> map = new HashMap<>();
            String email = student.getEmail();
            String contactNumber = student.getContactNumber();
            String name = student.getName();
           String city = student.getCity();
           int currentYear = student.getCurrentYear();
            int semester = student.getSemester();

            if(email != null)
                map.put("email_id = ?", email);

            if(contactNumber != null)
                map.put("contact_number = ?", contactNumber);

            if(name!= null)
                map.put("name = ?", name);

            if(semester != 0)
                map.put("semester = ?", semester);

            if (city != null)
                map.put("city = ?", city);

            if (currentYear != 0)
                map.put("current_year = ?", currentYear);

            Set<String> keys = map.keySet();
            String query = "update student set " +
                    String.join(",", map.keySet().toArray(new String[keys.size()]))+
                    " where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);

            Object[] values = map.values().toArray(new Object[keys.size()]);
            for(int i=0; i<values.length; i++) {
                Object val = values[i];
                if(val instanceof String){
                    preparedStatement.setString(i+1, (String)val);
                } else if(val instanceof Integer){
                    preparedStatement.setInt(i+1, (int)val);
                }
            }

            preparedStatement.setString(values.length+1, studentId);
            preparedStatement.executeUpdate();

            con.close();
            return studentRepo.getStudent(studentId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addStudent(Student student){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String id = student.getId();
            String name = student.getName();
            String email = student.getEmail();
            String password = student.getPassword();
            int currentYear  = student.getCurrentYear();
            String department = student.getDepartment();
            int semester = student.getSemester();
            String contactNumber = student.getContactNumber();
            String dob = student.getDob();
            int yearOfJoining = student.getYearOfJoining();
            int graduationYear = student.getGraduationYear();
            String city = student.getCity();

            String query = "insert into student values (?,?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement preparedStatement = con.prepareStatement(query);

            preparedStatement.setString(1, id);
            preparedStatement.setString(2, name);
            preparedStatement.setString(3, email);
            preparedStatement.setString(4, password);
            preparedStatement.setInt(5, currentYear);
            preparedStatement.setString(6, department);
            preparedStatement.setInt(7, semester);
            preparedStatement.setString(8, contactNumber);
            preparedStatement.setString(9, dob);
            preparedStatement.setInt(10, yearOfJoining);
            preparedStatement.setInt(11, graduationYear);
            preparedStatement.setString(12, city);

            preparedStatement.executeUpdate();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteStudent(String studentId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "delete from student where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, studentId);
            preparedStatement.executeUpdate();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
