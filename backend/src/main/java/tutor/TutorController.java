package tutor;

import auth.AuthJWT;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import student.Student;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name="tutor",urlPatterns = "/tutors/*")
public class TutorController extends HttpServlet {
    private final TutorService tutorService = new TutorService();
    private final Gson gson = new Gson();

    private void sendAsJson(HttpServletResponse resp, Object object) throws IOException {
        resp.setContentType("application/json");
        resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setStatus(HttpServletResponse.SC_OK);
        PrintWriter printWriter = resp.getWriter();
        printWriter.write(gson.toJson(object));
        printWriter.flush();
    }

    private void sendAsString(HttpServletResponse resp, String str) throws IOException {
        resp.setContentType("application/json");
        resp.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "PUT, GET, DELETE, OPTIONS");
        resp.setStatus(HttpServletResponse.SC_OK);
        PrintWriter printWriter = resp.getWriter();
        printWriter.write(str);
        printWriter.flush();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            String token = req.getHeader("token");
            if (token == null || token.equals("")) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            AuthJWT.verifyToken(token);
            String pathInfo = req.getPathInfo();
            String[] pathInfos = pathInfo.split("/");
        String tutorId = pathInfos[1];
        if (pathInfos.length == 2) {
            Tutor tutor = tutorService.getTutor(tutorId);
            if (tutor != null) {
                sendAsJson(resp, tutor);
            } else
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else if(pathInfos.length == 3 && pathInfos[2].equals("students")) {
            List<Student> students = tutorService.getStudents(tutorId);
            sendAsJson(resp, students);
        } else if(pathInfos.length == 4 && pathInfos[2].equals("students")) {
            // TODO: performance
            String studentId = pathInfos[3];
        }

        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getHeader("token");
        if (token == null || token.equals("")) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        AuthJWT.verifyToken(token);
        Student studentReq = gson.fromJson(req.getReader(),Student.class);
        tutorService.addStudent(studentReq);
        sendAsString(resp, "SUCCESS");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String[] pathInfos = pathInfo.split("/");
        System.out.println(pathInfo);
        if(pathInfos.length == 3 && pathInfos[1].equals("students")) {
            String studentId = pathInfos[2];
            Student studentReq = gson.fromJson(req.getReader(),Student.class);
            Student student = tutorService.updateStudent(studentId, studentReq);
            if (student != null) {
                sendAsJson(resp, student);
            } else
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String[] pathInfos = pathInfo.split("/");
        String studentId = pathInfos[2];
        TutorService tutorService = new TutorService();
//        tutorService.deleteStudent(studentId); // enable this for DEMO
        sendAsString(resp, "SUCCESS");
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
