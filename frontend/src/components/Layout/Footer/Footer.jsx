import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialLinkedin,
} from 'react-icons/ti';

function Footer() {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading children="All Rights Resereved" color={'white'}></Heading>
          <Heading
            children="@lovishdtwts"
            color={'yellow.400'}
            fontFamily={'body'}
            size={'sm'}
          ></Heading>
        </VStack>
        <HStack spacing={['2', '10']} justifyContent={'center'} color={'white'}>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <TiSocialInstagram />
          </a>
          <a
            href="https://twitter.com/lovishdtwts"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/lovish-duggal-08118023a/"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialLinkedin />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
}

export default Footer;
