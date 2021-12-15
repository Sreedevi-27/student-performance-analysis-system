package auth;

import tutor.Tutor;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import student.Student;
import principal.Principal;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name="auth", urlPatterns = "/login")
public class AuthController extends HttpServlet{
    private final AuthService authService = new AuthService();
    private final Gson gson = new Gson();

    private final String ALLOWED_ORIGIN = "http://localhost:3000";

    private void sendAsString(HttpServletResponse resp, String string) throws IOException {
        resp.setContentType("application/text");
        resp.addHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        resp.setStatus(HttpServletResponse.SC_OK);
        PrintWriter printWriter = resp.getWriter();
        printWriter.write(string);
        printWriter.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");
        Roles role = Roles.valueOf(req.getParameter("role"));

        if(role.equals(Roles.STUDENT)) {
            Student student = authService.checkUserCredentialsStudent(email, password);
            if (student != null) {
                String token = AuthJWT.getToken(Roles.STUDENT);
                sendAsString(resp, student.getId() + " " + token + " " + Roles.STUDENT);
            }
            else {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else if(role.equals(Roles.TUTOR)){
           Tutor tutor = authService.checkUserCredentialsTutor(email, password);
            if(tutor !=null) {
                String token = AuthJWT.getToken(Roles.TUTOR);
                sendAsString(resp, tutor.getId() + " " + token + " " + Roles.TUTOR);
            }
            else {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else if(role.equals(Roles.PRINCIPAL)){
            Principal principal = authService.checkUserCredentialsPrincipal(email, password);
            if(principal !=null) {
                String token = AuthJWT.getToken(Roles.PRINCIPAL);
                sendAsString(resp, principal.getId() + " " + token + " " + Roles.PRINCIPAL);
            }
            else {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
       resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
}
