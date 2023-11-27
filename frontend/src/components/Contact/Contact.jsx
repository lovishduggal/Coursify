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
import { contactUs } from '../../redux/slices/miscellaneousSlice';
import { useDispatch } from 'react-redux';

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(contactUs({ name, email, message }));
  }
  return (
    <Container
      h="90vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <VStack spacing={'16'}>
        <Heading children="Contact Us"></Heading>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
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
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              resize={'none'}
              required
              id="message"
              placeholder="your message"
              focusBorderColor="yellow.500"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            send Mail
          </Button>
          <Box my="4">
            {' '}
            Request for a course?{' '}
            <Link to="/request">
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

export default Contact;
