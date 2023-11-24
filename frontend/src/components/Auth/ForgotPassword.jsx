import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/slices/userSlice';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  return (
    <Container
      py="16"
      h="90vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form onSubmit={submitHandler}>
        <Heading
          children="Forgot Password"
          my="14"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        ></Heading>
        <VStack spacing={'8'}>
          <Input
            required
            placeholder="xyz@gmail.com"
            type="email"
            focusBorderColor="yellow.500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" w="full" colorScheme="yellow">
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ForgotPassword;
