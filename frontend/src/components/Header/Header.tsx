import { Flex, Image, Avatar, Menu, MenuButton, MenuList, MenuItem , Text} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import logo from '../../assets/logo.png'
import { User } from '../../types'

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <Flex as="header" bg="blue.500" color="white" p={4} justify="space-between" align="center">
      <Image src={logo} alt="Logo" boxSize="40px" mr={2} />

      {/* Navigation Links */}
      <Flex gap={4}>

      </Flex>

      {user && (
        <Menu>
          <MenuButton as={Flex} alignItems="center" cursor="pointer">
            <Avatar name={user.name} src={user.avatarUrl || undefined} size="sm" />
            <ChevronDownIcon ml={2} />
          </MenuButton>
          <MenuList padding={0} minW={"50%"} borderRadius={0}>
            <MenuItem 
              backgroundColor="GrayText" h="100%" 
              borderRadius={0}
              onClick={onLogout}>
                <Text textTransform="uppercase" fontSize="calc(3px + 0.9vw)">Logout</Text>
              </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}

export default Header