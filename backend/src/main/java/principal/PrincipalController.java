package principal;

import auth.AuthJWT;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import student.Student;
import tutor.Tutor;
import tutor.TutorRepo;
import tutor.TutorService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name="principal",urlPatterns = "/principal/*")
public class PrincipalController extends HttpServlet {
    private final PrincipalService principalService = new PrincipalService();
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
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getHeader("token");
        if (token == null || token.equals("")) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        AuthJWT.verifyToken(token);
        String pathInfo = req.getPathInfo();
        String[] pathInfos = pathInfo.split("/");

        if (pathInfos.length == 2) {
            String principalId = pathInfos[1];
            Principal principal = principalService.getPrincipal(principalId);
            if (principal != null) {
                sendAsJson(resp, principal);
            } else
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }

        else if (pathInfos.length == 3 && pathInfos[2].equals("tutors")) {
            List<Tutor> tutors = principalService.getTutors();
            sendAsJson(resp, tutors);
        }

        else if(pathInfos.length == 5 && pathInfos[4].equals("students")){
            String tutorId = pathInfos[3];
            TutorService tutorService = new TutorService();
            List<Student> students = tutorService.getStudents(tutorId);
            sendAsJson(resp, students);
        }
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
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
