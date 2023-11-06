import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Request() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  return (
    <Container
      h="90vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <VStack spacing={'16'}>
        <Heading children="Request a New Course"></Heading>
        <form style={{ width: '100%' }}>
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
              placeholder="xyz@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="course" children="course" />
            <Textarea
              resize={'none'}
              required
              id="course"
              placeholder="Explain the course"
              focusBorderColor="yellow.500"
              value={course}
              onChange={e => setCourse(e.target.value)}
            />
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            send Mail
          </Button>
          <Box my="4">
            {' '}
            See available courses!{' '}
            <Link to="/courses">
              {' '}
              <Button colorScheme="yellow" variant={'link'}>
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}
export default Request;
