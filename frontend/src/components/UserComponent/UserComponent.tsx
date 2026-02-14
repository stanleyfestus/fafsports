import React from 'react';
import { Box, Text, Stack, Button, Avatar, Link, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface UserCardProps {
  user: Partial<User>;
  editLink?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, editLink }) => {
  const navigate = useNavigate();

  const handleEdit = () => editLink && navigate(editLink);

  const InfoRow: React.FC<{ label: string; value?: string | number | boolean }> = ({ label, value }) => {
    if (value === undefined || value === null || value === '') return null;
    return (
      <Text fontSize="sm">
        <strong>{label}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </Text>
    );
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      bg="white"
      maxW="full"
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" spacing={4} align="center">
          <Avatar name={user.name} src={user.avatarUrl || 'https://via.placeholder.com/150'} size="lg" />
          <Stack spacing={1}>
            <Heading size="md">{user.name}</Heading>
            <InfoRow label="Role" value={user.role} />
            <InfoRow label="Nationality" value={user.nationality} />
          </Stack>
        </Stack>

        {/* Contact */}
        <Stack spacing={1}>
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Date of Birth" value={user.dateOfBirth} />
        </Stack>

        {/* Physical / Skills */}
        <Stack spacing={1}>
          <InfoRow label="Height (cm)" value={user.height} />
          <InfoRow label="Weight (kg)" value={user.weight} />
          <InfoRow label="Preferred Foot" value={user.preferredFoot} />
          {user.position && user.position.length > 0 && (
            <InfoRow label="Position(s)" value={user.position.join(', ')} />
          )}
        </Stack>

        {/* Club */}
        {user.currentClub && (
          <Stack spacing={1}>
            <InfoRow label="Current Club" value={user.currentClub.name} />
            <InfoRow label="League" value={user.currentClub.league} />
            <InfoRow label="Country" value={user.currentClub.country} />
            <InfoRow label="Since" value={user.currentClub.since} />
          </Stack>
        )}

        {/* Bio */}
        <InfoRow label="Bio" value={user.bio} />

        {/* Career Stats */}
        {user.careerStats && (
          <Stack spacing={1}>
            <InfoRow label="Appearances" value={user.careerStats.appearances} />
            <InfoRow label="Goals" value={user.careerStats.goals} />
            <InfoRow label="Assists" value={user.careerStats.assists} />
            <InfoRow label="Yellow Cards" value={user.careerStats.yellowCards} />
            <InfoRow label="Red Cards" value={user.careerStats.redCards} />
          </Stack>
        )}

        {/* Previous Clubs */}
        {user.previousClubs?.map((club, idx) => (
          <Text fontSize="sm" key={idx}>
            <strong>Previous Club:</strong> {club.name} ({club.from} - {club.to})
          </Text>
        ))}

        {/* Agent */}
        {user.agentContact && (
          <Stack spacing={1}>
            <InfoRow label="Agent Name" value={user.agentContact.name} />
            <InfoRow label="Agent Phone" value={user.agentContact.phone} />
            <InfoRow label="Agent Email" value={user.agentContact.email} />
          </Stack>
        )}

        {/* Social Links */}
        {user.socialLinks && (
          <Stack direction="row" spacing={2} wrap="wrap">
            {user.socialLinks.instagram && <Link href={user.socialLinks.instagram} isExternal color="blue.500">Instagram</Link>}
            {user.socialLinks.linkedin && <Link href={user.socialLinks.linkedin} isExternal color="blue.500">LinkedIn</Link>}
            {user.socialLinks.website && <Link href={user.socialLinks.website} isExternal color="blue.500">Website</Link>}
          </Stack>
        )}

        {/* Videos */}
        {user.videos?.map((video, idx) => (
          <Link href={video.url} isExternal color="blue.500" key={idx}>
            {video.title}
          </Link>
        ))}

        <InfoRow label="Available for Transfer" value={user.isAvailableForTransfer} />

        {/* Edit Button */}
        {editLink && (
          <Button colorScheme="teal" size="sm" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default UserCard;
