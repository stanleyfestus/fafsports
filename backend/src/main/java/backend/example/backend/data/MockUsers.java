package backend.example.backend.data;

import java.util.*;

public class MockUsers {
    public static final List<Map<String, Object>> users = List.of(
        Map.ofEntries(
            Map.entry("id", "admin_001"),
            Map.entry("email", "info@vlieservice.nl"),
            Map.entry("password", "adminpass"),
            Map.entry("createdAt", "2022-01-01T00:00:00Z"),
            Map.entry("role", "admin")
        ),
        Map.ofEntries(
            Map.entry("id", "user_001"),
            Map.entry("email", "lahm.martinez@example.com"),
            Map.entry("password", "password123"),
            Map.entry("createdAt", "2022-02-01T00:00:00Z"),
            Map.entry("role", "PLAYER")
        ),
        Map.ofEntries(
            Map.entry("id", "user_002"),
            Map.entry("email", "daniel.okoye@example.com"),
            Map.entry("password", "securepassword"),
            Map.entry("createdAt", "2022-03-01T00:00:00Z"),
            Map.entry("role", "PLAYER")
        ),
        Map.ofEntries(
            Map.entry("id", "user_003"),
            Map.entry("email", "marco.bianchi@example.com"),
            Map.entry("password", "mypassword"),
            Map.entry("createdAt", "2022-04-01T00:00:00Z"),
            Map.entry("role", "PLAYER")
        ),
        Map.ofEntries(
            Map.entry("id", "user_004"),
            Map.entry("email", "sophia.jensen@example.com"),
            Map.entry("password", "mypassword"),
            Map.entry("createdAt", "2022-05-01T00:00:00Z"),
            Map.entry("role", "PLAYER")
        ),
        Map.ofEntries(
            Map.entry("id", "user_005"),
            Map.entry("email", "thiago.silva@example.com"),
            Map.entry("password", "mypassword"),
            Map.entry("createdAt", "2022-06-01T00:00:00Z"),
            Map.entry("role", "PLAYER")
        )
    );
}