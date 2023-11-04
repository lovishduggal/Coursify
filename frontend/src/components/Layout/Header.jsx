import React from 'react';
import ColorModeSwitcher from '../../ColorModeSwitcher.js';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function LinkButton({ url = '/', title = 'Home', onClose }) {
  return (
    <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
}

function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isAuthenticated = false;
  const user = {
    role: 'admin',
  };
  function logoutHandler() {
    onClose();
  }
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top={'6'}
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        position={'relative'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign={'center'} borderBottom={'1px'}>
            COURSIFY
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Explore All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About Us" />
            </VStack>
            <HStack
              justifyContent={'space-evenly'}
              position={'absolute'}
              bottom={'8'}
              width={'80%'}
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link onClick={onClose} to="/profile">
                        <Button variant={'ghost'} colorScheme="yellow">
                          Profile
                        </Button>
                      </Link>
                      <Button variant={'ghost'} onClick={logoutHandler}>
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>
                    {user && user.role === 'admin' && (
                      <Link onClick={onClose} to="/admin/dashboard">
                        <Button colorScheme="purple" variant={'ghost'}>
                          {' '}
                          <RiDashboardFill style={{ margin: '4px' }} />{' '}
                          DashBoard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link onClick={onClose} to="/login">
                    <Button colorScheme="yellow">Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link onClick={onClose} to="/register">
                    <Button colorScheme="yellow">Register</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
