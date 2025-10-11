package backend.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  @GetMapping({"", "/"})
    public String getAdminInfo() {
      return "Admin info for me";
    }
}
