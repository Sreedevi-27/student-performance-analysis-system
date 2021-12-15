package principal;

import config.Config;
import student.Student;
import tutor.Tutor;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class PrincipalRepo {
    public Principal getPrincipal(String principalId){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select id, name, email_id, city, contact_number from principal";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            Principal principal = new Principal(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getString("email_id"),
                    resultSet.getString("city"),
                    resultSet.getString("contact_number")

            );
            con.close();
            return principal;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Tutor> getTutors(){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select id, name from tutor";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<Tutor> tutors = new ArrayList();
            while (resultSet.next()){
                tutors.add(new Tutor(
                        resultSet.getString("id"),
                        resultSet.getString("name")
                ));
            }
            con.close();
            return tutors;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<Student> getStudents(){
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "select id, name from student";
            PreparedStatement preparedStatement = con.prepareStatement(query);
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
}
