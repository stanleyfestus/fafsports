import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../UserComponent/userSlice';
import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  Stack,
  Heading,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import { User } from '../../types';

interface EditUserProps {
  user: Partial<User>;
  onSave?: (updatedUser: Partial<User>) => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onSave }) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (key: keyof User, value: unknown) => {
    if (['height', 'weight'].includes(key)) {
      setFormData(prev => ({
        ...prev,
        [key]: value === '' ? undefined : Math.max(0, Number(value)),
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };



  const handleNestedChange = (
    parentKey: keyof User,
    childKey: string,
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: { ...(prev[parentKey] as Record<string, unknown>), [childKey]: value },
    }));
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      console.log('Updating user with data:', `http://localhost:3000/player/update/${user.id}`);
      const response = await fetch(`http://localhost:3000/player/update/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) { 
        const errorMessage = 'Failed to update user. Please try again.';
        throw new Error(errorMessage);
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (onSave) onSave(data);
      dispatch(setUser(data));
      navigate('/user');
    },
    onError: (error) => {
      console.error('Error updating user:', error);
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    },
  });

  const handleSave = () => {
    console.log('Saving user with data:', formData);
    updateMutation.mutate(formData);
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={6}>Edit User</Heading>
      <Stack spacing={4}>
        {/* Personal Info */}
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Nationality</FormLabel>
          <Input
            value={formData.nationality || ''}
            onChange={(e) => handleChange('nationality', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Height (cm)</FormLabel>
          <Input
            type="number"
            value={formData.height ?? ''}
            onChange={(e) => handleChange('height', e.target.value)}
            min={0}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Weight (kg)</FormLabel>
          <Input
            type="number"
            min={0}   
            value={formData.weight ?? ''}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Preferred Foot</FormLabel>
          <Input
            value={formData.preferredFoot || ''}
            onChange={(e) => handleChange('preferredFoot', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Position(s)</FormLabel>
          <Input
            value={formData.position?.join(', ') || ''}
            onChange={(e) =>
              handleChange(
                'position',
                e.target.value.split(',').map((p) => p.trim())
              )
            }
          />
        </FormControl>

        {/* Current Club */}
        <Heading size="md" mt={6}>
          Current Club
        </Heading>
        <FormControl>
          <FormLabel>Club Name</FormLabel>
          <Input
            value={formData.currentClub?.name || ''}
            onChange={(e) =>
              handleNestedChange('currentClub', 'name', e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>League</FormLabel>
          <Input
            value={formData.currentClub?.league || ''}
            onChange={(e) =>
              handleNestedChange('currentClub', 'league', e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            value={formData.currentClub?.country || ''}
            onChange={(e) =>
              handleNestedChange('currentClub', 'country', e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Since</FormLabel>
          <Input
            type="date"
            value={formData.currentClub?.since || ''}
            onChange={(e) =>
              handleNestedChange('currentClub', 'since', e.target.value)
            }
          />
        </FormControl>

        {/* Bio */}
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={formData.bio || ''}
            onChange={(e) => handleChange('bio', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <Checkbox
            isChecked={formData.isAvailableForTransfer || false}
            onChange={(e) =>
              handleChange('isAvailableForTransfer', e.target.checked)
            }
          >
            Available for Transfer
          </Checkbox>
        </FormControl>
        <Stack spacing={4}>
          {/* ...all your form fields here... */}

          <Stack direction="row" spacing={4} mt={4}>
            <Button colorScheme="teal" onClick={handleSave}>
        Save
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                navigate(-1); 
              }}
            >
        Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditUser;
