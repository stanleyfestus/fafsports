package backend.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import backend.example.backend.data.MockPlayersProfile;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/player")
public class PlayersController {

    private boolean isAuthorized(String token, String id) {
        return token != null && !token.isEmpty() && MockPlayersProfile.players.stream()
        .anyMatch(profile -> id.equals(profile.get("id")));
   }

   @GetMapping({"", "/"})
    public String getPlayerInfo(
        @PathVariable String id,
        @RequestHeader(value = "token", required = false) String token
    ) {
         if (!isAuthorized(token, id)) {
            return "Unauthorized";
        }
        return "Player info for me";
        
    }

    @PostMapping({"", "/"})
    public String createPlayer(@RequestBody String player) {
        // Add logic to create player
        return "Player created";
    }

    @GetMapping("/{id}")
    public Object getPlayerById(@PathVariable String id,
        @RequestHeader(value = "token", required = false) String token
) {
        if (!isAuthorized(token, id)) {
            return "Unauthorized";
        }
        return MockPlayersProfile.players.stream()
            .filter(profile -> id.equals(profile.get("id")))
            .findFirst()
            .orElse(null);
    }

    @PutMapping("/{id}")
    public String updatePlayer(@PathVariable String id, @RequestBody String player) {
        // Add logic to update player
        return "Player updated: " + id;
    }

    @DeleteMapping("/{id}")
    public String deletePlayer(@PathVariable String id) {
        // Add logic to delete player
        return "Player deleted: " + id;
    }
}
