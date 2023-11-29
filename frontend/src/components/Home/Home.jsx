import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import bg from '../../assets/images/bg.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import intro from '../../assets/videos/intro.mp4';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../redux/slices/userSlice';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100vh"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing="8"
          >
            {' '}
            <Heading
              children="LEARN FROM THE BEST MENTORS"
              size="2xl"
            ></Heading>
            <Text
              children="Find The Best Courses At Best Price "
              fontSize={'2xl'}
              fontFamily="cursive"
              textAlign={['center', 'left']}
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={bg}
            objectFit={'contain'}
          />
        </Stack>
      </div>

      <Box padding={'8'} bg={'blackAlpha.800'}>
        <Heading
          children="OUR PARTNERS"
          textAlign={'center'}
          fontFamily={'body'}
          color={'yellow.400'}
        />
        <HStack
          className="brandsBanner"
          justifyContent={'space-between'}
          marginTop={'4'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          // autoPlay
          controls
          controlsList="nodownload nofullscreen"
          disablePictureInPicture
          disableRemotePlayback
          src={intro}
        ></video>
      </div>
    </section>
  );
}

export default Home;
