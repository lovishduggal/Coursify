import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/slices/userSlice';

function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    const { payload } = await dispatch(resetPassword({ token, password }));
    if (payload?.success) navigate('/login');
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
