package auth;

import principal.Principal;
import tutor.Tutor;
import student.Student;


public class AuthService {
   private final AuthRepo authRepo = new AuthRepo();

   public Student checkUserCredentialsStudent(String email, String password) {
      return authRepo.checkAndGetUserCredentialsStudent(email,password);
   }

   public Tutor checkUserCredentialsTutor(String email, String password) {
      return authRepo.checkAndGetUserCredentialsTutor(email,password);
   }

   public Principal checkUserCredentialsPrincipal(String email, String password) {
      return authRepo.checkAndGetUserCredentialsPrincipal(email,password);
   }
}
