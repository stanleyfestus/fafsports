import React from "react";
import { User } from "../../types";
import { Flex, Box, Text, Avatar, Link } from "@chakra-ui/react";

interface PlayerListProps {
  players?: User[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players = [] }) => {
  if (!players.length)
    return <p className="text-center text-gray-500 mt-8">No players found.</p>;

  return (
    <Box>
      {players.map((player) => (
        <Flex direction="column" p={4} borderWidth="1px" borderRadius="md" boxShadow="sm" gap={4} key={player.id}>
          <Flex align="center" gap={4}>
            <Avatar name={player.name} src={player.avatarUrl || 'https://via.placeholder.com/150'} size="lg" />
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {player.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {player.nationality}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text fontSize="sm">
              <strong>Email:</strong> {player.email}
            </Text>
            <Text fontSize="sm">
              <strong>Phone:</strong> {player.phone}
            </Text>
          </Box>
       
          <Box>
            <Text fontSize="sm">
              {Array.isArray(player.position) && player.position.length > 0 ? 
                player.position.join(', ') : 'N/A'}
            </Text>
            <Text fontSize="sm">
              <strong>Preferred Foot:</strong> {player.preferredFoot}
            </Text>
            <Text fontSize="sm">
              <strong>Current Club:</strong> {player.currentClub?.name} ({player.currentClub?.league}, {player.currentClub?.country})
            </Text>
            <Text fontSize="sm">
              <strong>Since:</strong> {player.currentClub?.since}
            </Text>
          </Box>
       
          <Box>
            <Text fontSize="sm">
              <strong>Career Stats:</strong>
            </Text>
            <Text 
              fontSize="sm">
                 Appearances: {player.careerStats?.appearances}, 
                 Goals: {player.careerStats?.goals}, 
                 Assists: {player.careerStats?.assists}
            </Text>
            <Text 
              fontSize="sm">
                 Yellow Cards: {player.careerStats?.yellowCards}, 
                 Red Cards: {player.careerStats?.redCards}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm">
              <strong>Bio:</strong> {player.bio}
            </Text>
          </Box>
       
          {/* Social Links */}
          <Box>
            <Text fontSize="sm">
              <strong>Social Links:</strong>
            </Text>
            {player.socialLinks?.instagram && (
              <Link href={player.socialLinks?.instagram} isExternal color="blue.500">
                   Instagram
              </Link>
            )}
            {player.socialLinks?.linkedin && (
              <Link href={player.socialLinks?.linkedin} isExternal color="blue.500" ml={2}>
                   LinkedIn
              </Link>
            )}
            {player.socialLinks?.website && (
              <Link href={player.socialLinks?.website} isExternal color="blue.500" ml={2}>
                   Website
              </Link>
            )}
          </Box>
       
          <Box>
            <Text fontSize="sm">
              <strong>Previous Clubs:</strong>
            </Text>
            {player.previousClubs?.map((club, index) => (
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
                 Name: {player.agentContact?.name}
            </Text>
            <Text fontSize="sm">  
                 Phone: {player.agentContact?.phone}
            </Text>
            <Text>
                 Email: {player.agentContact?.email}
            </Text>
          </Box>
       
          <Box>
            <Text fontSize="sm">
              <strong>Videos:</strong>
            </Text>
            {player.videos?.map((video, index) => (
              <Link href={video.url} isExternal color="blue.500" key={index}>
                {video.title}
              </Link>
            ))}
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default PlayerList;
