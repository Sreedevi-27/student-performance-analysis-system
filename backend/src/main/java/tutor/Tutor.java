package tutor;

public class Tutor {
    String id;
   String name;
    String email;
    int handlingYear;
    String department;
    String contactNumber;
    String city;

    public Tutor(String id){
        this.id = id;
    }

    public Tutor(String id, String name, String email, int handlingYear, String department, String contactNumber, String city) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.handlingYear = handlingYear;
        this.department = department;
        this.contactNumber = contactNumber;
        this.city = city;
    }

    public Tutor(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }
}
