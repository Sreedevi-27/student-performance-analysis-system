package student;

import auth.AuthJWT;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@WebServlet(name="student",urlPatterns = "/students/*")
public class StudentController extends HttpServlet {
    private final StudentService studentService = new StudentService();
    private final Gson gson = new Gson();

    private void sendAsJson(HttpServletResponse resp, Object object) throws IOException {
        resp.setContentType("application/json");
        resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials","true");
        PrintWriter printWriter = resp.getWriter();
        printWriter.write(gson.toJson(object));
        printWriter.flush();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        try {
            String token = req.getHeader("token");
            if(token == null || token.equals("")) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            AuthJWT.verifyToken(token);
            String pathInfo = req.getPathInfo();

            String[] pathInfos = pathInfo.split("/");
            String studentId = pathInfos[1];
            if (pathInfos.length == 3) {
                if (pathInfos[2].equals("marks")) { // {student id}/marks
                    List<Mark> marks = studentService.getMarks(studentId);
                    sendAsJson(resp, marks);
                }
                if (pathInfos[2].equals("attendance")) { // {student id}/attendance
                    List<Attendance> attendance = studentService.getAttendance(studentId);
                    sendAsJson(resp, attendance);
                }
                if (pathInfos[2].equals("performance")) { // {student id}/performance
                    Performance performance = studentService.getPerformance(studentId);
                    sendAsJson(resp, performance);
                }
                if (pathInfos[2].equals("quiz")) { // {student id}/quiz
                    Quiz quiz = studentService.getQuiz(studentId);
                    sendAsJson(resp, quiz);
                }
            } else { // /{student id
                    Student student = studentService.getStudent(studentId);
                    if (student != null) {
                        resp.setStatus(HttpServletResponse.SC_OK);
                        sendAsJson(resp, student);
                    } else
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }

        } catch (JWTVerificationException e) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        String token = req.getHeader("token");
        if(token == null || token.equals("")) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        AuthJWT.verifyToken(token);
        String pathInfo = req.getPathInfo();
        String[] pathInfos = pathInfo.split("/");
        if (pathInfos.length == 5 && pathInfos[4].equals(("submit"))) {
            String quizId = pathInfos[3];
            HashMap answers = gson.fromJson(req.getReader(), HashMap.class);
            Quiz quiz = studentService.updateQuiz(quizId, answers);
            sendAsJson(resp, quiz);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.addHeader("Access-Control-Allow-Headers", "token");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "PUT, GET, DELETE, OPTIONS");
        super.doOptions(req, resp);
    }
}
