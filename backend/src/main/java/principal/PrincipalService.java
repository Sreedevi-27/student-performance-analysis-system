package principal;

import student.Student;
import tutor.Tutor;
import java.util.List;

public class PrincipalService {
    PrincipalRepo principalRepo = new PrincipalRepo();

    public Principal getPrincipal(String principalId){
        return principalRepo.getPrincipal(principalId);
    }

    public List<Tutor> getTutors(){
        return principalRepo.getTutors();
    }

    public List<Student> getStudents(){
        return principalRepo.getStudents();
    }
}
