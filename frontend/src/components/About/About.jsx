import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import intro from '../../assets/videos/intro.mp4';
import termsAndCondition from '../../assets/docs/termsAndCondition';
import { RiSecurePaymentFill } from 'react-icons/ri';

function Founder() {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar
          src="https://avatars.githubusercontent.com/u/104680808?v=4"
          boxSize={['40', '48']}
        />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Lovish Duggal" size={['md', 'xl']} />
        <Text
          textAlign={['center', 'left']}
          children="Hi, I m a full-stack MERN developer. Our aim is to provide best content at low price"
        />
      </VStack>
    </Stack>
  );
}
function VideoPlayer() {
  return (
    <video
      autoPlay
      controls
      controlsList="nodownload nofullscreen"
      disablePictureInPicture
      disableRemotePlayback
      src={intro}
    ></video>
  );
}

function TandC() {
  return (
    <Box>
      <Heading
        size={'md'}
        children="Terms & Condition"
        textAlign={['center', 'left']}
        my="4"
      />

      <Box h="sm" p="4" overflowY={'scroll'}>
        <Text
          fontFamily={'heading'}
          letterSpacing={'widest'}
          textAlign={['center', 'left']}
        >
          {termsAndCondition}
        </Text>
        <Heading
          my="4"
          size={'xs'}
          children="Refund only applicable for cancellation within 7 days."
        />
      </Box>
    </Box>
  );
}

function About() {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
        <Text textAlign={['center', 'left']}>
          We are video streaming platform with some premium courses available
          only for premium users
        </Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            {' '}
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC />
      <HStack marginY={'4'} p="4">
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children="Payment is secured by Razorpay"
        />
      </HStack>
    </Container>
  );
}

export default About;
