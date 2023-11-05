import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container h={'95vh'}>
      <VStack h="full" justifyContent={'center'} spacing={'6'}>
        <Heading children="Welcome to Coursify" />
        <form style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              placeholder="xyz@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              placeholder="Enter your password"
              type="password"
              focusBorderColor="yellow.500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Link to="/forgotpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Fogot Password
              </Button>
            </Link>
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my="4">
            {' '}
            New User?{' '}
            <Link to="/register">
              {' '}
              <Button colorScheme="yellow" variant={'link'}>
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Login;
