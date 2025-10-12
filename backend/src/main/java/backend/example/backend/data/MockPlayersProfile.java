package backend.example.backend.data;

import java.util.*;

public class MockPlayersProfile {
    public static final List<Map<String, Object>> players = List.of(
        Map.ofEntries(
            Map.entry("id", "admin_001"),
            Map.entry("name", "Admin User"),
            Map.entry("avatarUrl", "Admin"),
            Map.entry("email", "admin@example.com"),
            Map.entry("phone", "+00 000 000 000"),
            Map.entry("nationality", "System"),
            Map.entry("dateOfBirth", "1970-01-01"),
            Map.entry("height", ""),
            Map.entry("weight", ""),
            Map.entry("position", Collections.emptyList()),
            Map.entry("preferredFoot", ""),
            Map.entry("currentClub", ""),
            Map.entry("previousClubs", Collections.emptyList()),
            Map.entry("careerStats", Map.of(
                "appearances", 0,
                "goals", 0,
                "assists", 0,
                "yellowCards", 0,
                "redCards", 0
            )),
            Map.entry("bio", "System administrator account with full access."),
            Map.entry("socialLinks", Collections.emptyMap()),
            Map.entry("videos", Collections.emptyList()),
            Map.entry("isAvailableForTransfer", false),
            Map.entry("agentContact", Map.of(
                "name", "System Admin",
                "phone", "+00 000 000 000",
                "email", "admin@example.com"
            )),
            Map.entry("isAdmin", true)
        ),
        Map.ofEntries(
            Map.entry("id", "user_001"),
            Map.entry("name", "Lahm Martínez"),
            Map.entry("avatarUrl", "https://randomuser.me/api/portraits/men/32.jpg"),
            Map.entry("email", "lahm.martinez@example.com"),
            Map.entry("phone", "+34 612 345 678"),
            Map.entry("nationality", "Spain"),
            Map.entry("dateOfBirth", "1998-04-15"),
            Map.entry("height", 180),
            Map.entry("weight", 75),
            Map.entry("position", List.of("Midfielder", "Winger")),
            Map.entry("preferredFoot", "Right"),
            Map.entry("currentClub", Map.of(
                "name", "Real Zaragoza",
                "league", "Segunda División",
                "country", "Spain",
                "since", "2022-08-01"
            )),
            Map.entry("previousClubs", List.of(
                Map.of("name", "UD Almería B", "from", "2020-07-01", "to", "2022-06-30"),
                Map.of("name", "Real Betis U19", "from", "2017-07-01", "to", "2020-06-30")
            )),
            Map.entry("careerStats", Map.of(
                "appearances", 87,
                "goals", 14,
                "assists", 21,
                "yellowCards", 6,
                "redCards", 1
            )),
            Map.entry("bio", "Creative and dynamic midfielder with great vision and passing ability."),
            Map.entry("socialLinks", Map.of(
                "instagram", "https://instagram.com/lahm.martinez",
                "linkedin", "https://linkedin.com/in/lanm-martinez-football",
                "website", "https://lahmmartinez.com"
            )),
            Map.entry("videos", List.of(
                Map.of("title", "2024 Highlights", "url", "https://youtube.com/watch?v=highlight1")
            )),
            Map.entry("isAvailableForTransfer", true),
            Map.entry("agentContact", Map.of(
                "name", "Sergio Alvarez",
                "phone", "+34 600 123 456",
                "email", "sergio@topagents.com"
            )),
            Map.entry("isAdmin", false)
        ),
        Map.ofEntries(
            Map.entry("id", "user_002"),
            Map.entry("name", "Daniel Okoye"),
            Map.entry("avatarUrl", "https://randomuser.me/api/portraits/men/45.jpg"),
            Map.entry("email", "daniel.okoye@example.com"),
            Map.entry("phone", "+234 803 123 4567"),
            Map.entry("nationality", "Nigeria"),
            Map.entry("dateOfBirth", "2000-06-22"),
            Map.entry("height", 185),
            Map.entry("weight", 82),
            Map.entry("position", List.of("Striker")),
            Map.entry("preferredFoot", "Left"),
            Map.entry("currentClub", Map.of(
                "name", "Enyimba FC",
                "league", "NPFL",
                "country", "Nigeria",
                "since", "2023-01-01"
            )),
            Map.entry("previousClubs", List.of(
                Map.of("name", "Kano Pillars", "from", "2021-01-01", "to", "2022-12-31")
            )),
            Map.entry("careerStats", Map.of(
                "appearances", 55,
                "goals", 28,
                "assists", 5,
                "yellowCards", 3,
                "redCards", 0
            )),
            Map.entry("bio", "Powerful forward known for speed and finishing under pressure."),
            Map.entry("socialLinks", Map.of(
                "instagram", "https://instagram.com/daniel.okoye9"
            )),
            Map.entry("videos", List.of(
                Map.of("title", "Top 10 Goals", "url", "https://youtube.com/watch?v=strikergoals")
            )),
            Map.entry("isAvailableForTransfer", true),
            Map.entry("agentContact", Map.of(
                "name", "Chuka Mba",
                "phone", "+234 701 234 5678",
                "email", "chuka@goalsports.com"
            )),
            Map.entry("isAdmin", false)
        ),
        Map.ofEntries(
            Map.entry("id", "user_003"),
            Map.entry("name", "Marco Bianchi"),
            Map.entry("avatarUrl", "https://randomuser.me/api/portraits/men/51.jpg"),
            Map.entry("email", "marco.bianchi@example.com"),
            Map.entry("phone", "+39 320 123 4567"),
            Map.entry("nationality", "Italy"),
            Map.entry("dateOfBirth", "1995-09-30"),
            Map.entry("height", 177),
            Map.entry("weight", 70),
            Map.entry("position", List.of("Right Back")),
            Map.entry("preferredFoot", "Right"),
            Map.entry("currentClub", Map.of(
                "name", "Virtus Entella",
                "league", "Serie C",
                "country", "Italy",
                "since", "2021-07-01"
            )),
            Map.entry("previousClubs", List.of(
                Map.of("name", "Parma Calcio", "from", "2018-07-01", "to", "2021-06-30")
            )),
            Map.entry("careerStats", Map.of(
                "appearances", 110,
                "goals", 5,
                "assists", 19,
                "yellowCards", 12,
                "redCards", 1
            )),
            Map.entry("bio", "Disciplined fullback with high work rate and excellent crossing ability."),
            Map.entry("socialLinks", Map.of(
                "instagram", "https://instagram.com/marco.bianchi"
            )),
            Map.entry("videos", Collections.emptyList()),
            Map.entry("isAvailableForTransfer", false),
            Map.entry("agentContact", Map.of(
                "name", "Andrea Rossi",
                "phone", "+39 340 987 6543",
                "email", "andrea@italypros.com"
            )),
            Map.entry("isAdmin", false)
        ),
        Map.ofEntries(
            Map.entry("id", "user_004"),
            Map.entry("name", "Sophia Jensen"),
            Map.entry("avatarUrl", "https://randomuser.me/api/portraits/women/65.jpg"),
            Map.entry("email", "sophia.jensen@example.com"),
            Map.entry("phone", "+45 28 123 456"),
            Map.entry("nationality", "Denmark"),
            Map.entry("dateOfBirth", "2002-03-12"),
            Map.entry("height", 168),
            Map.entry("weight", 62),
            Map.entry("position", List.of("Center Midfielder")),
            Map.entry("preferredFoot", "Right"),
            Map.entry("currentClub", Map.of(
                "name", "Fortuna Hjørring",
                "league", "Kvindeligaen",
                "country", "Denmark",
                "since", "2020-09-01"
            )),
            Map.entry("previousClubs", Collections.emptyList()),
            Map.entry("careerStats", Map.of(
                "appearances", 60,
                "goals", 8,
                "assists", 17,
                "yellowCards", 4,
                "redCards", 0
            )),
            Map.entry("bio", "Young playmaker with excellent game vision and ball control."),
            Map.entry("socialLinks", Map.of(
                "linkedin", "https://linkedin.com/in/sophia-jensen"
            )),
            Map.entry("videos", Collections.emptyList()),
            Map.entry("isAvailableForTransfer", true),
            Map.entry("agentContact", Map.of(
                "name", "Eva Madsen",
                "phone", "+45 40 987 654",
                "email", "eva@prosports.dk"
            )),
            Map.entry("isAdmin", false)
        ),
        Map.ofEntries(
            Map.entry("id", "user_005"),
            Map.entry("name", "Thiago da Silva"),
            Map.entry("avatarUrl", "https://randomuser.me/api/portraits/men/72.jpg"),
            Map.entry("email", "thiago.silva@example.com"),
            Map.entry("phone", "+55 21 91234-5678"),
            Map.entry("nationality", "Brazil"),
            Map.entry("dateOfBirth", "1997-12-20"),
            Map.entry("height", 182),
            Map.entry("weight", 78),
            Map.entry("position", List.of("Center Back")),
            Map.entry("preferredFoot", "Right"),
            Map.entry("currentClub", Map.of(
                "name", "EC Bahia",
                "league", "Campeonato Brasileiro Série A",
                "country", "Brazil",
                "since", "2023-01-15"
            )),
            Map.entry("previousClubs", List.of(
                Map.of("name", "Botafogo", "from", "2019-01-01", "to", "2022-12-31")
            )),
            Map.entry("careerStats", Map.of(
                "appearances", 130,
                "goals", 7,
                "assists", 2,
                "yellowCards", 15,
                "redCards", 3
            )),
            Map.entry("bio", "Strong and intelligent defender with leadership experience and aerial strength."),
            Map.entry("socialLinks", Map.of(
                "instagram", "https://instagram.com/thiago.ds",
                "website", "https://thiagods.com"
            )),
            Map.entry("videos", List.of(
                Map.of("title", "Defensive Highlights", "url", "https://youtube.com/watch?v=defensiveplays")
            )),
            Map.entry("isAvailableForTransfer", false),
            Map.entry("agentContact", Map.of(
                "name", "Carlos Mendes",
                "phone", "+55 11 99999-8888",
                "email", "carlos@futebolpro.com"
            )),
            Map.entry("isAdmin", false)
        )
    );
}