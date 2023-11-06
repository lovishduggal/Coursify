import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  return (
    <Container
      py="16"
      h="90vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form>
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
