package backend.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.example.backend.data.MockPlayersProfile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping({"", "/"})
    public Object getPlayerInfo(
        @RequestHeader(value = "Authorization", required = true) String token,
        @RequestHeader(value = "role", required = true) String role
    ) {
        if (token == null || token.isEmpty() || !role.equals("admin")) {
            return "Unauthorized";
        }
        return MockPlayersProfile.players;
    }
}
