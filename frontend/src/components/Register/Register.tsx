import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react'

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>
  isLoading?: boolean
  errorMess: string
}

const Register: React.FC<RegisterProps> = ({ onRegister, isLoading, errorMess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleOnRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setError('')

    try {
      await onRegister(name, email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <Box
      p={6}
      maxW="500px"
      mx="auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
      position="relative"
      top={6}
    >
      <Heading mb={6} textAlign="center">
        Create Account
      </Heading>

      <VStack spacing={4}>
        <form onSubmit={(e) => { e.preventDefault(); handleOnRegister(); }} style={{width: "100%"}}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            mt={6}
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>

        {error &&(
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {errorMess &&(
          <Alert status="error">
            <AlertIcon />
            {errorMess}
          </Alert>
        )}
      </VStack>

      <Box mt={4} textAlign="center" fontSize="sm" color="gray.500">
        Already have an account? <Link href="/">Login</Link>.
      </Box>
    </Box>
  )
}

export default Register
