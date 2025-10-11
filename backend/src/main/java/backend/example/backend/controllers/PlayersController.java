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

@RestController
@RequestMapping("/api/player")
public class PlayersController {

   @GetMapping({"", "/"})
    public String getPlayerInfo() {
        return "Player info for me";
        
    }

    @PostMapping({"", "/"})
    public String createPlayer(@RequestBody String player) {
        // Add logic to create player
        return "Player created";
    }

    @GetMapping("/{id}")
    public Object getPlayerById(@PathVariable String id) {
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
