package auth;

import principal.Principal;
import tutor.Tutor;
import config.Config;
import student.Student;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthRepo {
    public Student checkAndGetUserCredentialsStudent(String email, String password) {
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "SELECT  id from student where email_id = ? and password = md5(?)";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            Student student = null;
            if(resultSet.next()){
                student = new Student(resultSet.getString("id"));
            }

            con.close();

            return student;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public Tutor checkAndGetUserCredentialsTutor(String email, String password) {
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "SELECT id from tutor where email_id = ? and password = md5(?)";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            Tutor tutor = null;
            if(resultSet.next()){
                tutor = new Tutor(resultSet.getString("id"));
            }

            con.close();

            return tutor;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public Principal checkAndGetUserCredentialsPrincipal(String email, String password) {
        try {
            Connection con = DriverManager.getConnection(Config.DB_URL, Config.USER, Config.PASSWORD);

            String query = "SELECT id from principal where email_id = ? and password = md5(?)";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            Principal principal = null;
            if(resultSet.next()){
                principal = new Principal(resultSet.getString("id"));
            }

            con.close();

            return principal;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
