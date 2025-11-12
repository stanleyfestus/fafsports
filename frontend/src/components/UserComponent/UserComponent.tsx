import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Text, Flex , Avatar, Link} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setUser } from "./userSlice";
import { User } from "../../types";

interface UserComponentProps {
  data: { email: string; token: string; id: string };
  user: User | null; 
}

const UserComponent: React.FC<UserComponentProps> = ({ data }) => {
  const dispatch = useDispatch();
  const localUser = useSelector((state: RootState) => state.localUser.user);
  const { token, id } = data;

  const profileQuery = useQuery<User>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/player/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Profile fetch failed (${response.status}): ${text}`);
      }

      const profile = await response.json();
      return profile;
    },
    enabled: !!token && !!id, // only after login
  });

  useEffect(() => {
    if (profileQuery.isSuccess && profileQuery.data) {
      dispatch(setUser(profileQuery.data));
    }
  }, [profileQuery.isSuccess, profileQuery.data, dispatch]);


  if (profileQuery.isLoading) return <Text>Loading profile...</Text>;
  if (profileQuery.isError)
    return <Text color="red.500">{(profileQuery.error as Error).message}</Text>;

  return (
    <Box p={4}>
      {localUser ? (
    <Flex direction="column" p={4} borderWidth="1px" borderRadius="md" boxShadow="sm" gap={4}>
           <Flex align="center" gap={4}>
        <Avatar name={localUser.name} src={localUser.avatarUrl || 'https://via.placeholder.com/150'} size="lg" />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {localUser.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {localUser.nationality}
          </Text>
        </Box>
        </Flex>
         <Box>
          <Text fontSize="sm">
            <strong>Email:</strong> {localUser.email}
          </Text>
          <Text fontSize="sm">
            <strong>Phone:</strong> {localUser.phone}
          </Text>
        </Box>

         <Box>
          <Text fontSize="sm">
             {Array.isArray(localUser.position) && localUser.position.length > 0 ? 
             localUser.position.join(', ') : 'N/A'}
          </Text>
          <Text fontSize="sm">
            <strong>Preferred Foot:</strong> {localUser.preferredFoot}
          </Text>
          <Text fontSize="sm">
            <strong>Current Club:</strong> {localUser.currentClub?.name} ({localUser.currentClub?.league}, {localUser.currentClub?.country})
          </Text>
          <Text fontSize="sm">
            <strong>Since:</strong> {localUser.currentClub?.since}
          </Text>
      </Box>

       <Box>
        <Text fontSize="sm">
          <strong>Career Stats:</strong>
        </Text>
        <Text 
          fontSize="sm">
          Appearances: {localUser.careerStats?.appearances}, 
          Goals: {localUser.careerStats?.goals}, 
          Assists: {localUser.careerStats?.assists}
        </Text>
        <Text 
          fontSize="sm">
          Yellow Cards: {localUser.careerStats?.yellowCards}, 
          Red Cards: {localUser.careerStats?.redCards}
        </Text>
        </Box>
      <Box>
        <Text fontSize="sm">
          <strong>Bio:</strong> {localUser.bio}
        </Text>
      </Box>

      {/* Social Links */}
      <Box>
        <Text fontSize="sm">
          <strong>Social Links:</strong>
        </Text>
        {localUser.socialLinks?.instagram && (
          <Link href={localUser.socialLinks?.instagram} isExternal color="blue.500">
            Instagram
          </Link>
        )}
        {localUser.socialLinks?.linkedin && (
          <Link href={localUser.socialLinks?.linkedin} isExternal color="blue.500" ml={2}>
            LinkedIn
          </Link>
        )}
        {localUser.socialLinks?.website && (
          <Link href={localUser.socialLinks?.website} isExternal color="blue.500" ml={2}>
            Website
          </Link>
        )}
      </Box>

      <Box>
        <Text fontSize="sm">
          <strong>Previous Clubs:</strong>
        </Text>
        {localUser.previousClubs?.map((club, index) => (
          <Text fontSize="sm" key={index}>
            {club.name} ({club.from} - {club.to})
          </Text>
        ))}
      </Box>

      <Box>
        <Text fontSize="sm">
          <strong>Agent Contact:</strong>
        </Text>
        <Text fontSize="sm">
          Name: {localUser.agentContact?.name}
        </Text>
        <Text fontSize="sm">  
          Phone: {localUser.agentContact?.phone}
        </Text>
        <Text>
          Email: {localUser.agentContact?.email}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm">
          <strong>Videos:</strong>
        </Text>
        {localUser.videos?.map((video, index) => (
          <Link href={video.url} isExternal color="blue.500" key={index}>
            {video.title}
          </Link>
        ))}
      </Box>
    </Flex>
      ) : (
        <Text>No profile data.</Text>
      )}
    </Box>
  );
};

export default UserComponent;
