import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

function ResetPassword() {
  const [password, setPassword] = useState('');
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
          children="Reset Password"
          my="14"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        ></Heading>
        <VStack spacing={'8'}>
          <Input
            required
            placeholder="Enter your new password"
            type="password"
            focusBorderColor="yellow.500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" w="full" colorScheme="yellow">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
export default ResetPassword;
