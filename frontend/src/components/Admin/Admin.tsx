import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types";
import PlayerList from "../Players/PlayersComponent";

interface AdminComponentProps {
  data: { email: string; token: string; id: string; } | null;
}

const Admin: React.FC<AdminComponentProps> = ({ data }) => {
  const [users, setUsers] = useState<User[]>([]);
  const token = data?.token;

  console.log("Admin component data:", data?.token);
  const profileQuery = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/admin", {
        headers: { Authorization: `Bearer ${token}`, role: "admin" },
      });
      if (!response.ok) throw new Error("Failed to load users");
      return response.json();
    },
    enabled: !!token, // only run after login
  });

  useEffect(() => {
    if (profileQuery.isSuccess && profileQuery.data) {
      setUsers(profileQuery.data);
    }
  }, [profileQuery.isSuccess, profileQuery.data]);

  if (profileQuery.isLoading) return <Text>Loading admin data...</Text>;
  if (profileQuery.isError)
    return (
      <Text color="red.500">
        {(profileQuery.error as Error).message}
      </Text>
    );

    console.log("Fetched users:", users);
  return (
    <Box p={4}>
      {users.length > 0 ? (
        users
          .filter((user) => !user.isAdmin)
          .map((user) => (
            <Box key={user.id} mb={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
              <PlayerList players={[user]} />
            </Box>
          ))
      ) : (
        <Text>No users found.</Text>
      )}
    </Box>
  );
};

export default Admin;
