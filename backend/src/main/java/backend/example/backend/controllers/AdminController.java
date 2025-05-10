package backend.example.backend.controllers;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

  // Inner class for User (Corrected)
    public static class User {
        private String firstName;
        private String lastName;
        private String country;
        private String position;
        private int age;
        private Long id; 

        public User(Long id, String firstName, String lastName, String country, String position, int age) { 
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.country = country;
            this.position = position;
            this.age = age;
        }
        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }
        public String getCountry() {
            return country;
        }
        public String getPosition() {
            return position;
        }
        public int getAge() {
            return age;
        }

        public Long getId() { // added getter
          return id;
      }
      public void setId(Long id) {  // Added setter for ID.  Important for updates.
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    }

    private List<User> users = new ArrayList<>();
    private Long nextUserId = 1L; 

    @GetMapping("/dashboard")
      public String admin() {
        return "Hello Admin!"; 
    }

    @GetMapping("/users")
     public ResponseEntity<List<User>> getUsers() {
      users.add(new User(nextUserId++, "John", "Doe", "Liberia", "Striker", 30 ));
      // return new ResponseEntity<>(users, HttpStatus.OK);
      return new ResponseEntity<>(List.of(), HttpStatus.OK);
     }

    @GetMapping("/users/{id}")
    public String getUser(@PathVariable Long id) {
        return "Single user";
    }

    @PostMapping("/users")
    public String createUser(@RequestBody User newUser) {
        return "User created";
    }

    @PutMapping("/users/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return "User updated";
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        return "User deleted";
    }
}
