package student;

public class Student {
    private String id;
    private String name;
    private String email;
    private String password;
    private int currentYear;
    private String department;
    private int semester;
    private String contactNumber;
    private String dob;
    private int yearOfJoining;
    private int graduationYear;
    private String city;
    private String[] marks;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCurrentYear() {
        return currentYear;
    }

    public void setCurrentYear(int currentYear) {
        this.currentYear = currentYear;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public int getYearOfJoining() {
        return yearOfJoining;
    }

    public void setYearOfJoining(int yearOfJoining) {
        this.yearOfJoining = yearOfJoining;
    }

    public int getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(int graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String[] getMarks() {
        return marks;
    }

    public void setMarks(String[] marks) {
        this.marks = marks;
    }

    public Student(String id) {
        this.id =  id;
    }

    public Student(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public Student(String id, String name, String email, int currentYear, String department, int semester,
                   String contactNumber, String dob, int yearOfJoining, int graduationYear, String city) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.currentYear = currentYear;
        this.department = department;
        this.semester = semester;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.yearOfJoining = yearOfJoining;
        this.graduationYear = graduationYear;
        this.city = city;
    }

    public Student(String id, String name, String email, String password, int currentYear, String department,
                   int semester, String contactNumber, String dob, int yearOfJoining, int graduationYear, String city) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.currentYear = currentYear;
        this.department = department;
        this.semester = semester;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.yearOfJoining = yearOfJoining;
        this.graduationYear = graduationYear;
        this.city = city;
    }
}
