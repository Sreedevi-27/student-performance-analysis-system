package principal;

public class Principal {
    String id;
    String name;
    String email_id;
    String city;
    String contact_number;
    public Principal(String id) {
        this.id = id;
    }

    public Principal(String id, String name, String email_id, String city, String contact_number) {
        this.id = id;
        this.name = name;
        this.email_id = email_id;
        this.city = city;
        this.contact_number = contact_number;
    }

    public String getId() {
        return id;
    }
}
