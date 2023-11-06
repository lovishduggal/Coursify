import {
  Avatar,
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

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  function changeImageHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  }
  return (
    <Container h={'95vh'}>
      <VStack h="full" justifyContent={'center'} spacing={'6'}>
        <Heading textTransform={'uppercase'} children="Register" />
        <form style={{ width: '100%' }}>
          <Box
            marginY={'4'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              placeholder="Krishna"
              type="text"
              focusBorderColor="yellow.500"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              placeholder="krishna01@gmail.com"
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
          <Box marginY={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              required
              accept="image/*"
              id="chooseAvatar"
              placeholder="Enter your password"
              type="file"
              focusBorderColor="yellow.500"
              value={password}
              onChange={changeImageHandler}
              css={{
                '&::file-selector-button': {
                  cursor: 'pointer',
                  marginLeft: '-5%',
                  width: '110%',
                  height: '100%',
                  color: '#ecc94b',
                  backgroundColor: 'white',
                  border: 'none',
                },
              }}
            />
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Sign Up
          </Button>
          <Box my="4">
            {' '}
            Already Signed Up?{' '}
            <Link to="/login">
              {' '}
              <Button colorScheme="yellow" variant={'link'}>
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Register;
