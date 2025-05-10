import { Box, Flex, Avatar, Text, Link } from '@chakra-ui/react'
import { User } from '../../types'

interface UserComponentProps {
  user: User
}

const UserComponent: React.FC<UserComponentProps> = ({ user }) => {
  return (
    <Flex direction="column" p={4} borderWidth="1px" borderRadius="md" boxShadow="sm" gap={4}>
      <Flex align="center" gap={4}>
        <Avatar name={user.name} src={user.avatarUrl || 'https://via.placeholder.com/150'} size="lg" />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {user.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user.nationality}
          </Text>
        </Box>
      </Flex>

      {/* Contact Info */}
      <Box>
        <Text fontSize="sm">
          <strong>Email:</strong> {user.email}
        </Text>
        <Text fontSize="sm">
          <strong>Phone:</strong> {user.phone}
        </Text>
      </Box>

      {/* Position and Club */}
      <Box>
        <Text fontSize="sm">
          <strong>Position:</strong> {user.position.join(', ')}
        </Text>
        <Text fontSize="sm">
          <strong>Preferred Foot:</strong> {user.preferredFoot}
        </Text>
        <Text fontSize="sm">
          <strong>Current Club:</strong> {user.currentClub.name} ({user.currentClub.league}, {user.currentClub.country})
        </Text>
        <Text fontSize="sm">
          <strong>Since:</strong> {user.currentClub.since}
        </Text>
      </Box>

      {/* Career Stats */}
      <Box>
        <Text fontSize="sm">
          <strong>Career Stats:</strong>
        </Text>
        <Text fontSize="sm">
          Appearances: {user.careerStats.appearances}, Goals: {user.careerStats.goals}, Assists: {user.careerStats.assists}
        </Text>
        <Text fontSize="sm">
          Yellow Cards: {user.careerStats.yellowCards}, Red Cards: {user.careerStats.redCards}
        </Text>
      </Box>

      {/* Bio */}
      <Box>
        <Text fontSize="sm">
          <strong>Bio:</strong> {user.bio}
        </Text>
      </Box>

      {/* Social Links */}
      <Box>
        <Text fontSize="sm">
          <strong>Social Links:</strong>
        </Text>
        {user.socialLinks.instagram && (
          <Link href={user.socialLinks.instagram} isExternal color="blue.500">
            Instagram
          </Link>
        )}
        {user.socialLinks.linkedin && (
          <Link href={user.socialLinks.linkedin} isExternal color="blue.500" ml={2}>
            LinkedIn
          </Link>
        )}
        {user.socialLinks.website && (
          <Link href={user.socialLinks.website} isExternal color="blue.500" ml={2}>
            Website
          </Link>
        )}
      </Box>

      <Box>
        <Text fontSize="sm">
          <strong>Previous Clubs:</strong>
        </Text>
        {user.previousClubs.map((club, index) => (
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
          Name: {user.agentContact.name}
        </Text>
        <Text fontSize="sm">  
          Phone: {user.agentContact.phone}
        </Text>
        <Text>
        Email: {user.agentContact.email}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm">
          <strong>Videos:</strong>
        </Text>
        {user.videos.map((video, index) => (
          <Link href={video.url} isExternal color="blue.500" key={index}>
            {video.title}
          </Link>
        ))}
      </Box>
    </Flex>
  )
}

export default UserComponent