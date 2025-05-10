import React from 'react'
import { Box } from '@chakra-ui/react'
import { User } from '../../types'
import UserComponent from '../UserComponent/UserComponent'

interface AdmingCompentProps {
 users: User[]
}

const Admin: React.FC<AdmingCompentProps> = ({ users }) => {
  return (
    <Box p={4}>
     {users.length > 0 && users.filter(user => !user.isAdmin).map(user => <UserComponent user={user} />)}
    </Box>
  )
}

export default Admin