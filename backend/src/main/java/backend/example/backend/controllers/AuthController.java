package backend.example.backend.controllers;

import backend.example.backend.data.MockUsers;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
   @PostMapping("/login")
   public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    Optional<Map<String, Object>> userOpt = MockUsers.users.stream()
    .filter(u -> Objects.equals(u.get("email"), email) && Objects.equals(u.get("password"), password))
    .findFirst();
    
    if(userOpt.isPresent()) {
      Map<String, Object> user = new HashMap<>(userOpt.get());
      Map<String, Object> response = new HashMap<>();
      response.put("token", "eyJhbGciOiJIUzI1NiIs"); // Example token
      response.put("email", user.get("email"));
      response.put("id", user.get("id"));
      return ResponseEntity.ok(response);
    } else {
       return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
  }
}
